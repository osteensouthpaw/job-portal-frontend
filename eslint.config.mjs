import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // Add or override rules here
      "react-hooks/exhaustive-deps": "off",
      "no-unused-vars": "off",
      "no-console": "off",
      "react/display-name": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "import/no-anonymous-default-export": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  }),
];

export default eslintConfig;
