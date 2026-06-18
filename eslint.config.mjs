import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022, // ← autorise la syntaxe ES2022
      sourceType: "module", // ← indique que c'est un module (top-level await)
      globals: {
        window: "readonly",
        document: "readonly",
        fetch: "readonly",
        URLSearchParams: "readonly",
        IntersectionObserver: "readonly",
      },
    },
  },
];
