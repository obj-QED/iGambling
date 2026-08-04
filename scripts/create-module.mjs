#!/usr/bin/env node
import path from 'node:path';
import process from 'node:process';

import { writeModule } from './create-module/generate.mjs';
import { buildMeta, isWidgetModuleDir, resolveTarget } from './create-module/utils.mjs';

function printHelp() {
  console.log(`Create FSD module scaffold (header-like widget + theme tokens)

Usage:
  yarn scaffold path:ModuleName [--force]

  path     — parent folder (alias or src/... path; created if missing)
  ModuleName — folder name + all identifiers (App*, resolve*Config, types)

Preferred:
  yarn scaffold widget:Sidebar        → src/widgets/sidebar/
  yarn scaffold src/widgets:PromoBanner
  yarn scaffold src/features/auth:AuthPanel

Legacy (still supported):
  yarn scaffold widget Sidebar
  yarn scaffold src/widgets/promo

Aliases: widget, feature, page, entity, ui, component (+ plural forms)

Widget scaffold (src/widgets/*) also creates:
  src/assets/theme/tokens/widgets/{kebab}/
    tokens.scss | widget.tokens.scss | menu.tokens.scss
  patches src/assets/theme/tokens/theme.scss (@use + @include)
  styles/_mixins.scss, shell surface tokens on Root (like header)

Generated structure:
  config/ (defaults + resolve*Config)
  lib/ registry/ types/ ui/ styles/ public.ts index.ts

Tests (repo root, not under src):
  test/widgets/{kebab}/resolve.test.ts
`);
}

async function main() {
  const cwd = process.cwd();
  const args = process.argv.slice(2).filter((arg) => arg !== '--force');
  const force = process.argv.includes('--force');

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printHelp();
    process.exit(args.length === 0 ? 1 : 0);
  }

  let target;
  try {
    target = resolveTarget(cwd, args);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    printHelp();
    process.exit(1);
  }

  const meta = buildMeta(target.kebabName);
  const files = await writeModule(target.dir, meta, { force, projectRoot: cwd });
  const relativeDir = path.relative(cwd, target.dir);
  const importBase = relativeDir.startsWith(`src${path.sep}`)
    ? `@/${relativeDir.slice(4).split(path.sep).join('/')}`
    : `@/${relativeDir.split(path.sep).join('/')}`;
  const isWidget = isWidgetModuleDir(target.dir);

  console.log(`\nCreated ${meta.appExportName} at ${relativeDir}/\n`);
  console.log(`  Module    : ${target.moduleName ?? target.kebabName}`);
  console.log(`  Folder    : ${target.kebabName}`);
  console.log(`  Component : ${meta.appExportName}`);
  console.log(`  Config    : ${meta.resolveConfig}() ← window.__SETTINGS__.${meta.camel}`);
  console.log(`  Types     : default | classic`);
  console.log(`  Layouts   : container | container-fluid`);
  if (isWidget) {
    console.log(`  Theme     : src/assets/theme/tokens/widgets/${target.kebabName}/`);
    console.log(`              + theme.scss @include ${meta.sassAlias}.${target.kebabName}-root-tokens`);
  }
  console.log(`  Files     : ${files.length}\n`);
  console.log(`Import:\n  import { ${meta.appExportName}, ${meta.resolveConfig} } from '${importBase}';\n`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
