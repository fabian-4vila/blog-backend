import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const compat = new FlatCompat();

export default [
{
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
    parser: tsParser,
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
    },
    },
    plugins: {
    "@typescript-eslint": tsPlugin,
    prettier: prettierPlugin,
    },
    rules: {
    ...prettierConfig.rules,
    "prettier/prettier": "warn",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "warn",
    },
},
];
