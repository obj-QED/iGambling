// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { typescriptStrictRules } from './eslint.typescript.rules.js';

const localPlugin = {
  rules: {
    'no-empty-jsx-whitespace': {
      meta: {
        type: 'layout',
        fixable: 'whitespace',
        schema: [],
        messages: {
          remove: 'Remove whitespace from empty JSX elements.',
        },
      },
      create(context) {
        return {
          JSXText(node) {
            if (node.value.trim().length > 0 || !node.range) return;
            const parent = node.parent;
            if (!parent || parent.type !== 'JSXElement') return;

            const hasNonWhitespaceChildren = parent.children.some(
              (child) => child.type !== 'JSXText' || child.value.trim().length > 0,
            );
            if (hasNonWhitespaceChildren) return;

            context.report({
              node,
              messageId: 'remove',
              fix(fixer) {
                return fixer.removeRange(node.range);
              },
            });
          },
        };
      },
    },
  },
};

export default tseslint.config(
  { ignores: ['coverage', 'dist', 'node_modules', 'storybook-static', 'vitest.shims.d.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      local: localPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...typescriptStrictRules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'local/no-empty-jsx-whitespace': 'error',

      /**
       * Import group order:
       *  1. type imports from external libraries (react, redux, @tanstack...)
       *  2. value imports from react / react-dom
       *  3. value imports from other external packages
       *  4. @/app - bootstrap, routing, providers
       *  5. @pages, @elements
       *  6. @components, @ui
       *  7. @AppBanner, @AppFooter, @AppHeader, @AppSidebar, …
       *  8. @shared, @entities, @api, @store, @hooks, @schemas
       *  9. @/app, other @/ aliases (assets, …)
       * 10. Relative imports (./, ../)
       * 11. Styles (side-effect imports, always last)
       */
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Type imports: all packages (external + @/ + relative) - \u0000 suffix is added by the plugin
            ['^.*\\u0000$'],
            // 2. react + react-dom value imports
            ['^react(-dom)?(/.*)?$'],
            // 3. Other external value imports
            ['^@?\\w'],
            // 4. @/app
            ['^@/app(/.*|$)'],
            // 5. @pages, @elements
            ['^@(pages|elements)(/|$)'],
            // 6. @components, @ui (design-system barrel under src/shared/ui)
            ['^@(components|ui)(/|$)'],
            // 7. @AppBanner, @AppHeader, …
            ['^@(AppBanner|AppFooter|AppHeader|AppSidebar)(/|$)'],
            // 8. @shared, @entities, @api, @store, @hooks, @schemas
            ['^@(shared|entities|api|store|hooks|schemas)(/|$)'],
            // 9. other @/ imports (assets, etc.)
            ['^@(/.*|$)'],
            // 10. Relative imports
            ['^\\.'],
            // 11. Styles - always last
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['.storybook/**/*.ts', '.storybook/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./.storybook/tsconfig.json'],
        projectService: false,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['src/vite-env.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  storybook.configs['flat/recommended'],
);
