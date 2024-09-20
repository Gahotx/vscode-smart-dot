export default [
  {
    target: 'log',
    format: 'console.log($label, $value)',
    desc: 'console.log(\'value\', value)',
    smartLabel: true,
  },
  {
    target: 'info',
    format: 'console.info($label, $value)',
    desc: 'console.info(\'value\', value)',
    smartLabel: true,
  },
  {
    target: 'warn',
    format: 'console.warn($label, $value)',
    desc: 'console.warn(\'value\', value)',
    smartLabel: true,
  },
  {
    target: 'error',
    format: 'console.error($label, $value)',
    desc: 'console.error(\'value\', value)',
    smartLabel: true,
  },
]
