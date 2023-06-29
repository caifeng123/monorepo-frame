module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['airbnb-typescript/base'],
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
};
