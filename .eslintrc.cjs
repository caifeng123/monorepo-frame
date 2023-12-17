module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['**/output/*', '**/es/*', '**/lib/*'],
  settings: {
    'import/internal-regex': /^@cc\//,
    'import/resolver': {
      typescript: {}
    }
  },
  extends: [
    // 有react相关
    'airbnb',
    'airbnb-typescript'

    // 纯node库可用 https://www.npmjs.com/package/eslint-config-airbnb-base
    // airbnb-base
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'simple-import-sort'],
  rules: {
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
};
