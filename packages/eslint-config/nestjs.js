import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import turboPlugin from "eslint-plugin-turbo";
import onlyWarn from "eslint-plugin-only-warn";

/**
 * ESLint configuration for NestJS applications.
 */
export default [
  {
    ...js.configs.recommended,
    ignores: ["dist/**", "node_modules/**", ".turbo/**"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      turbo: turboPlugin,
      onlyWarn,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
];