export default [
  {
    target: 'forin',
    format: [
      'for (const item in $value) {',
      '  $cursor',
      '}',
    ],
    desc: 'for (const item in object) {}',
  },
]
