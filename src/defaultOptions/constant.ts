import type { IOption } from '../types'

export default [
  {
    target: 'const',
    format: 'const $value = $cursor',
    desc: 'const value = xxx',
  },
  {
    target: 'let',
    format: 'let $value = $cursor',
    desc: 'let value = xxx',
  },
  {
    target: 'var',
    format: 'var $value = $cursor',
    desc: 'var value = xxx',
  },
  {
    target: 'typeof',
    format: 'typeof $value',
    desc: 'typeof value',
  },
] as IOption[]
