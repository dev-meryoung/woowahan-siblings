module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'import'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'import/no-anonymous-default-export': [
      2,
      {
        allowObject: true,
      },
    ],
    'no-useless-rename': 'error',
    'object-shorthand': 'error',
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'react/react-in-jsx-scope': 'off',
  },
};