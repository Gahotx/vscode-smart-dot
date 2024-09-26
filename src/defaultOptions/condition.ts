import type { IOption } from '../types'

export default [
  {
    target: 'if',
    format: [
      'if ($value) {',
      '  $cursor',
      '}',
    ],
    desc: 'if ($value) {}',
  },
  {
    target: 'ifelse',
    format: [
      'if ($value) {',
      '  $cursor',
      '} else {',
      '  ',
      '}',
    ],
    desc: 'if ($value) {} else {}',
  },
] as IOption[]
