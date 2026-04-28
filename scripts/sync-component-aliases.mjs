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

const STATIC_PATHS = {
  '@/*': ['src/*'],
  '@/components': ['src/components'],
  '@/pages': ['src/pages'],
  '@/api': ['src/api'],
  '@/store': ['src/store'],
  '@/shared': ['src/shared'],
  '@/ui': ['src/ui'],
  '@/elements': ['src/elements'],
  '@/hooks': ['src/hooks'],
  '@/schemas': ['src/schemas'],
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
