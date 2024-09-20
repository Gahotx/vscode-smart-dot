import * as vscode from 'vscode'
import type { IOption } from './types'

export class CompletionProvider implements vscode.CompletionItemProvider {
  /**
   * @description 补全项
   */
  private options: IOption[]

  /**
   * @description 光标位置
   */
  private position?: vscode.Position

  /**
   * @description 初始化
   * @param options 补全项
   */
  constructor(options: IOption[]) {
    this.options = options
  }

  /**
   * @description 定义补全项
   */
  public provideCompletionItems(_textDocument: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
    this.position = position
    const completions = this.options.map((m: IOption): vscode.CompletionItem => {
      const snippet: vscode.CompletionItem = {
        label: m.target,
        kind: vscode.CompletionItemKind.Operator,
        documentation: m.desc,
      }
      return snippet
    }) || []
    return completions
  }

  /**
   * @description 触发补全项
   */
  public resolveCompletionItem(completionItem: vscode.CompletionItem): vscode.CompletionItem {
    const label = completionItem.label
    if (this.position && this.options && typeof label === 'string') {
      const option = this.options.find(f => f.target === label)

      completionItem.command = {
        title: 'refactor',
        command: 'smart-dot-replace',
        arguments: [this.position.translate(0, label.length + 1), option],
      }
    }
    return completionItem
  }
}
