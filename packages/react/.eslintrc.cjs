module.exports = {
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/rsbuild.config.ts']
      }
    ]
  }
};
