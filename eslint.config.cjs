const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  // Base JS rules
  js.configs.recommended,

  // TypeScript rules (ONLY for TS source files)
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["src/**/*.ts"],
  })),

  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal"],
          "newlines-between": "always",
        },
      ],
    },
  },

  // Ignore config & build files
  {
    ignores: [
      "eslint.config.cjs",
      "dist/**",
      "node_modules/**",
      "prisma/**",
      "prisma.config.ts",
    ],
  },
];
