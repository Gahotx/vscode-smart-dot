export default [
  {
    target: 'ref',
    format: 'const $value = ref($cursor)',
    desc: 'const $value = ref()',
  },
  {
    target: 'reactive',
    format: 'const $value = reactive($cursor)',
    desc: 'const $value = reactive()',
  },
  {
    target: 'computed',
    format: [
      'const $value = computed(() => {',
      '  $cursor',
      '})',
    ],
    desc: 'const $value = computed(() => {})',
  },
  {
    target: 'watch',
    format: [
      'watch(',
      '  () => $value,',
      '  (newValue, oldValue) => {',
      '    $cursor',
      '  }',
      ')',
    ],
    desc: 'watch(() => $value, (newValue, oldValue) => {})',
  },
  {
    target: 'watchEffect',
    format: [
      'watchEffect(() => {',
      '  console.log($value)',
      '  $cursor',
      '})',
    ],
    desc: 'watchEffect(() => { console.log($value) })',
  },
]
