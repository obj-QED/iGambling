#!/usr/bin/env node
/**
 * Syncs @<ComponentName>/* aliases in tsconfig.app.json
 * based on the contents of src/components/.
 *
 * Run: node scripts/sync-component-aliases.mjs
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const COMPONENTS_DIR = resolve(ROOT, 'src/components');
const TSCONFIG_PATH = resolve(ROOT, 'tsconfig.app.json');

/**
 * TypeScript `paths` need two entries per logical package when you both:
 * - import the barrel: `from '@ui'` / `from '@store'` / `from '@pages'`
 * - import subpaths: `from '@ui/AppLink'` / `from '@store/slices/authSlice'`
 * The `*` pattern does not match the bare specifier (no `/` after the name), so `@name` and `@name/*` are paired, not duplicates.
 * `@/foo` is covered by `@/*` → `src/*`; no separate `@/schemas` entry needed.
 */
const STATIC_PATHS = {
  '@/*': ['src/*'],
  '@components': ['src/components/index.ts'],
  '@components/*': ['src/components/*'],
  '@ui': ['src/shared/ui'],
  '@ui/*': ['src/shared/ui/*'],
  '@schemas': ['src/schemas'],
  '@schemas/*': ['src/schemas/*'],
  '@shared/*': ['src/shared/*'],
  '@entities/*': ['src/entities/*'],
  '@api/*': ['src/api/*'],
  '@store': ['src/store/index.ts'],
  '@store/*': ['src/store/*'],
  '@hooks/*': ['src/hooks/*'],
  '@pages': ['src/pages/index.ts'],
  '@pages/*': ['src/pages/*'],
};

const componentNames = readdirSync(COMPONENTS_DIR).filter((name) => {
  return statSync(resolve(COMPONENTS_DIR, name)).isDirectory();
});

const dynamicPaths = Object.fromEntries(
  componentNames.map((name) => [`@${name}/*`, [`src/components/${name}/*`]]),
);

const tsconfig = JSON.parse(readFileSync(TSCONFIG_PATH, 'utf-8'));
tsconfig.compilerOptions.paths = { ...STATIC_PATHS, ...dynamicPaths };

writeFileSync(TSCONFIG_PATH, JSON.stringify(tsconfig, null, 2) + '\n');

console.log(
  `Synced ${componentNames.length} component aliases: ${componentNames.map((n) => `@${n}`).join(', ')}`,
);
