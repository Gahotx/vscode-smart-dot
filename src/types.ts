export interface IOption {
  /**
   * 触发器
   */
  target: string

  /**
   * 补全格式
   */
  format: string | string[]

  /**
   * 描述
   */
  desc: string
  /**
   * 智能格式化
   * 打印字符串、数字等常量时，自动隐藏 $label
   */
  smartLabel?: boolean
}
