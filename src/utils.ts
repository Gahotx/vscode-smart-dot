import { useLogger } from 'reactive-vscode'
import { displayName } from './generated/meta'

export const logger = useLogger(displayName)

/**
 * @description 根据特征判断是否是某个具体的类型
 * @param content 内容
 * @returns 具体的类型
 */
export function matchRealType(content: string): string {
  const strategy: {
    [key: string]: string
  } = {
    '^(\'|\"|\`)(.*?)(\'|\"|\`)$': 'string',
    '^(\{)(.*?)(\})$': 'object',
    '^(\\[)(.*?)(\\])$': 'array',
    '^[0-9]*$': 'number',
    '^(-?\\d+)(\.\\d+)?$': 'float',
  }
  let realType = 'string'
  const strategyReg = Object.keys(strategy)
  for (let i = 0; i < strategyReg.length; i++) {
    const f = strategyReg[i]
    if (new RegExp(f).test(content)) {
      realType = strategy[f]
      break
    }
  }
  return realType
}

/**
 * @description 计算 $label 的值
 * @param content 内容
 * @returns 具体的值
 */
export function compute$Label(content: string, smartLabel?: boolean): string {
  const matchVarReg = /(\S*[^`'"])$/
  const matchVar = content.match(matchVarReg)
  if ((!matchVar || !Number.isNaN(Number(content))) && smartLabel) {
    // 如果是数字或者字符串，则不需要 $label
    return ''
  }
  else if (!matchVar && !smartLabel) {
    return content
  }
  else if (matchVar) {
    return `'${content}'`
  }
  else {
    return JSON.stringify(content)
  }
}
