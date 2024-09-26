import type { IOption } from '../types'

export default [
  {
    target: 'fori',
    format: [
      'for (let i = 0; i < $value.length; i++) {',
      '  $cursor',
      '}',
    ],
    desc: 'for (let i = 0; i < array.length; i++) {}',
  },
  {
    target: 'forr',
    format: [
      'for (let i = $value.length - 1; i >= 0; i--) {',
      '  $cursor',
      '}',
    ],
    desc: 'for (let i = array.length - 1; i >= 0; i--) {}',
  },
  {
    target: 'forof',
    format: [
      'for (const value of $value) {',
      '  $cursor',
      '}',
    ],
    desc: 'for (const value of array) {}',
  },
  {
    target: 'forEach',
    format: [
      '$value.forEach((item, index) => {',
      '  $cursor',
      '})',
    ],
    desc: 'array.forEach((item, index) => {})',
  },
  {
    target: 'map',
    format: [
      '$value.map((item, index) => {',
      '  $cursor',
      '})',
    ],
    desc: 'array.map((item, index) => {})',
  },
] as IOption[]
