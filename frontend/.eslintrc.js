module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "vuetify",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: ["tsconfig.json"],
  },
  rules: {
    "vuetify/no-deprecated-classes": "error",
    "vuetify/grid-unknown-attributes": "error",
    "vuetify/no-legacy-grid": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/switch-exhaustiveness-check": ["error"],
    "default-case": ["off"],
    "no-use-before-define": ["off"],
    "@typescript-eslint/no-use-before-define": ["error", {functions: false}],
    "@typescript-eslint/no-unused-vars": ["warn", {args: "all", argsIgnorePattern: "^_"}],
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    "no-shadow": 0,
    "no-underscore-dangle": "off",
    "no-unused-expressions": [
      "off",
      {
        allowShortCircuit: true,
      },
    ],
    "no-useless-concat": 0,
    "prefer-template": "warn",
    "import/prefer-default-export": "warn",
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "ignore",
      },
    ],
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
    {
      files: ["src/generated/*.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
