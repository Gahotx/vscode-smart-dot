import { defineExtension, extensionContext } from 'reactive-vscode'
import * as vscode from 'vscode'
import type { IOption } from './types'
import { CompletionProvider } from './provider'
import defaultLanguages from './defaultLanguages'
import defaultOptions from './defaultOptions'
import { compute$Label, matchRealType } from './utils'

/**
 * 设置补全指令
 */
function setDocumentCommand() {
  const command = 'smart-dot-replace'
  const callback = (
    textEditor: vscode.TextEditor,
    edit: vscode.TextEditorEdit,
    position: vscode.Position,
    option: IOption,
  ): void => {
    const lineText = textEditor.document.lineAt(position.line).text
    const matchReg = new RegExp(`^(.*?).(${option.target})$`)
    const [lineContent, content, target] = lineText.trim().match(matchReg) || []
    if (target) {
      const positionIndex = lineText.indexOf(content)

      let spaceFill = ''
      if (typeof option.format !== 'string') {
        spaceFill = '\n'
        for (let i = 0; i < positionIndex; i++)
          spaceFill += ' '
      }

      let insertContent = typeof option.format === 'string' ? option.format : option.format.join(spaceFill)
      // $cursor 的行位置
      const cursorPositionLine = typeof option.format === 'string' ? 0 : option.format.findIndex((m: string) => m.includes('$cursor'))

      // 替换其他变量
      const format: {
        [key: string]: string
      } = {
        $simple: matchRealType(content).substring(0, 3),
        $stamp: matchRealType(content),
        $label: compute$Label(content, option.smartLabel),
        $value: content,
      }
      const formatReg = new RegExp(Object.keys(format).map((m: string) => `\\${m}`).join('|'), 'g')
      insertContent = insertContent.replace(formatReg, (key: string) => format[key])

      if (!format.$label && option.smartLabel) {
        const regex = /console\.(\w+)\(.*?,\s*/g
        insertContent = insertContent.replace(regex, 'console.$1(')
      }

      // $cursor 的列位置
      let cursorPositionIndex = -1
      if (cursorPositionLine !== -1) {
        if (typeof option.format === 'string')
          cursorPositionIndex = insertContent.indexOf('$cursor') + positionIndex - 2
        else
          cursorPositionIndex = insertContent.split('\n')[cursorPositionLine].indexOf('$cursor')
      }
      // 替换 $cursor
      insertContent = insertContent.replace('$cursor', '')

      edit.delete(
        new vscode.Range(
          position.with(undefined, positionIndex),
          position.with(undefined, positionIndex + (lineContent?.length || 0)),
        ),
      )

      edit.insert(position.with(undefined, positionIndex), insertContent)

      const focus = position.with(position.line + cursorPositionLine, cursorPositionIndex + 2)

      setTimeout(() => {
        if (cursorPositionIndex !== -1) {
          textEditor.selection = new vscode.Selection(focus, focus)
        }
        else {
          vscode.commands.executeCommand('cursorLineEnd')
        }
      })
    }
  }
  return vscode.commands.registerTextEditorCommand(command, callback)
}

/**
 * 设置代码补全
 */
function setDefaultProvider() {
  const smartDot: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('smartDot')
  const languages: vscode.DocumentSelector = (smartDot.get('languages') || []) as string[]
  const options: IOption[] = (smartDot.get('options') || []) as IOption[]

  // Create a map for defaultOptions with target as the key
  const completeMap = new Map<string, IOption>()
  defaultOptions.forEach(item => completeMap.set(item.target, item))

  // Iterate over options and replace or add items in the map
  options.forEach(option => completeMap.set(option.target, option))

  // Convert the map back to an array
  const mergedOptions = Array.from(completeMap.values())

  const selector: vscode.DocumentSelector = languages.length ? languages : defaultLanguages
  const provider: vscode.CompletionItemProvider = new CompletionProvider(mergedOptions)
  return vscode.languages.registerCompletionItemProvider(selector, provider, '.')
}

const { activate, deactivate } = defineExtension(() => {
  extensionContext.value?.subscriptions.push(setDocumentCommand())
  extensionContext.value?.subscriptions.push(setDefaultProvider())
})

export { activate, deactivate }
