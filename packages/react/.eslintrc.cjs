module.exports = {
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: ['plugin:react/jsx-runtime'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/rsbuild.config.ts']
      }
    ]
  }
};
