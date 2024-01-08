module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['**/output/*', '**/es/*', '**/lib/*', '**/cjs/*', '**/dist/*', '**/node_modules/*'],
  settings: {
    // 默认情况下，引用的任何包都将被视为“外部”，需要出现在package.json的dependencies/devDependencies
    // 所以对于monorepo的内部包需要设置内部库前缀，避免eslint无法找到
    'import/internal-regex': /^@cc\//,
    // import「内部库」的路径无法正常解析, 需要覆盖typescript配置
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
    'simple-import-sort/exports': 'error',
    // 处理别名引入
    'import/extensions': ['error', 'never'],
    // 关闭单独导出提示
    'import/prefer-default-export': 'off'
  }
};
