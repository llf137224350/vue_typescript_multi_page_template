module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'indent': [0, 2],
    'semi': ['error', 'always'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-self-assign': 'off',
    'object-curly-spacing': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-useless-escape': 'off',
    'dot-notation': 'off',
    'no-mixed-operators': 'off',
    'eqeqeq': 'off',
    'padded-blocks': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'comma-dangle': 'off',
    'lines-between-class-members': 'off',
    'space-before-function-paren': 'off',
    'object-property-newline': 'off'
  }
};
