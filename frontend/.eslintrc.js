module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
    },
  },
  ignorePatterns: ['node_modules/*', 'public/*'],
  plugins: [
    'react'
  ],
  rules: {
  }
}
