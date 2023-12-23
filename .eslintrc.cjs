module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['**/output/*', '**/es/*', '**/lib/*', '**/cjs/*', '**/dist/*'],
  settings: {
    // 设置内部库前缀 避免eslint无法找到
    'import/internal-regex': /^@cc\//,
    'import/resolver': {
      typescript: {}
    }
  },
  extends: [
    // airbnb ts配置
    // https://www.npmjs.com/package/eslint-config-airbnb-typescript
    'airbnb',
    'airbnb-typescript',

    // 带react
    'plugin:react/jsx-runtime'
  ],
  plugins: [
    // ts插件
    '@typescript-eslint/eslint-plugin',
    // 导入文件
    'import',
    // 文件导入导出排序
    'simple-import-sort'
  ],
  rules: {
    // 禁用尾逗号
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    // 文件导入导出排序
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
};
