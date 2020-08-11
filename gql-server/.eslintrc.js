module.exports = {
  parser: '@typescript-eslint/parser',
  // extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: { node: true },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  overrides: [
    {
      files: ['**/*.js'],
      extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
    },
    {
      files: ['**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    },
  ],
};
