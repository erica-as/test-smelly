import js from "@eslint/js";
import jest from "eslint-plugin-jest";

const nodeGlobals = {
  module: "readonly",
  require: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  exports: "readonly",
  process: "readonly",
  Buffer: "readonly",
  console: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
};

const jestGlobals = {
  describe: "readonly",
  test: "readonly",
  expect: "readonly",
  beforeEach: "readonly",
  afterEach: "readonly",
  beforeAll: "readonly",
  afterAll: "readonly",
  jest: "readonly",
};

export default [
  js.configs.recommended,
  {
    plugins: { jest },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...nodeGlobals,
        ...jestGlobals,
      },
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-conditional-expect": "error",
      "jest/no-identical-title": "error",
    },
  },
];
