import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginRouter from '@tanstack/eslint-plugin-router';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'build', '*.gen.ts']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginRouter.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@tanstack/query': tanstackQuery,
      '@tanstack/router': pluginRouter,
    },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
      ...reactRefresh.configs.vite.rules,
      ...tanstackQuery.configs.recommended.rules,
    },
  },
]);
