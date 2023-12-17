module.exports = {
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    'plugin:react/jsx-runtime'
  ],
  plugins: ['import']
};
