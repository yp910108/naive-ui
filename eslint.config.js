import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    html: true,
    css: true,
  },
}, {
  files: ['**/*.tsx'],
  rules: {
    // 配合 tsconfig.json 中 "compilerOptions": { "jsxFactory": "h" } 使用
    'unused-imports/no-unused-imports': 'off',
  },
})
