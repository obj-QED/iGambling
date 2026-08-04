import fs from 'node:fs/promises';
import path from 'node:path';

import { isWidgetModuleDir } from './utils.mjs';

function file(relativePath, content) {
  return { relativePath, content };
}

/** Theme tokens under `src/assets/theme/tokens/widgets/{kebab}/` — mirrors header. */
export function buildThemeFileTree(meta) {
  const k = meta.kebab;
  const p = meta.cssPrefix;

  const scrollBlock =
    meta.rootElement === 'aside'
      ? `
  /** Scrollbar — override per block via \`--${p}-scrollbar-*\` on scope. */
  --${p}-scrollbar-size: var(--cmf-scrollbar-size, 6px);
  --${p}-scrollbar-radius: var(--cmf-scrollbar-radius, 999px);
  --${p}-scrollbar-thumb: var(--cmf-scrollbar-thumb, rgb(255 255 255 / 22%));
  --${p}-scrollbar-thumb-hover: var(--cmf-scrollbar-thumb-hover, rgb(255 255 255 / 32%));
  --${p}-scrollbar-track: var(--cmf-scrollbar-track, transparent);`
      : '';

  return [
    file(
      'tokens.scss',
      `@use './menu.tokens' as menu;
@use './widget.tokens' as widget;

@mixin ${k}-root-tokens {
  @include menu.${k}-menu-tokens('${meta.menuSizeDefault}');
  @include widget.${k}-widget-tokens;
}
`,
    ),
    file(
      'widget.tokens.scss',
      `/**
 * ${meta.Pascal} shell — surface, layout, sections/blocks (not menu Button / link).
 */

@mixin ${k}-widget-tokens {
  --${p}-surface-bg: transparent;
  --${p}-surface-border-color: transparent;
  --${p}-surface-border-width: 0;
  --${p}-surface-shadow: none;
  --${p}-surface-backdrop-filter: none;
  --${p}-height: auto;
  --${p}-padding-x: 0;
  --${p}-padding-y: 10px;
  --${p}-section-gap: var(--spacing-md, 1rem);
  --${p}-block-gap: var(--spacing-xs, 0.25rem);
  --${p}-text-color: var(--color-text, inherit);
  --${p}-text-muted: var(--color-text-muted, inherit);${scrollBlock}
}
`,
    ),
    file(
      'menu.tokens.scss',
      `/**
 * ${meta.Pascal} menu — Mantine \`size\` keys + Button CMF layer 2.
 * Icon box / radius defaults: \`tokens/global/cmf-icon-tokens\` + \`cmf-control-icon.scss\`.
 */

@mixin ${k}-menu-size($size: '${meta.menuSizeDefault}') {
  --${p}-size-button: #{$size};
  --${p}-size-link: #{$size};
  --${p}-size-action-icon: #{$size};
}

@mixin ${k}-menu-tokens($size: '${meta.menuSizeDefault}') {
  @include ${k}-menu-size($size);

  --cmf-${p}-button-transparent-bg: transparent;
  --cmf-${p}-button-transparent-color: var(--mantine-color-text);
  --cmf-${p}-button-transparent-hover: color-mix(in srgb,
      var(--mantine-color-text) 10%,
      transparent);
  --cmf-${p}-button-transparent-hover-color: var(--mantine-color-text);
  --cmf-${p}-button-transparent-disabled-color: #6b6b6b;

  --cmf-${p}-button-outline-bg: var(--cmf-button-outline-bg);
  --cmf-${p}-button-outline-bd: var(--cmf-button-outline-bd);
  --cmf-${p}-button-outline-color: var(--cmf-button-outline-color);
  --cmf-${p}-button-outline-hover: var(--cmf-button-outline-hover);
  --cmf-${p}-button-outline-hover-color: var(--cmf-button-outline-hover-color);

  --cmf-${p}-button-radius: 8px;
  --cmf-${p}-action-icon-radius: 8px;
  --cmf-${p}-button-disabled-bg: #2e2e2e;
}
`,
    ),
  ];
}

export async function writeThemeTokens(projectRoot, meta, { force = false } = {}) {
  const themeDir = path.join(
    projectRoot,
    'src',
    'assets',
    'theme',
    'tokens',
    'widgets',
    meta.kebab,
  );

  const files = buildThemeFileTree(meta);

  try {
    const stat = await fs.stat(themeDir);
    if (stat.isDirectory()) {
      const entries = await fs.readdir(themeDir);
      if (entries.length > 0 && !force) {
        throw new Error(
          `Theme tokens directory is not empty: ${themeDir}\nUse --force to overwrite theme scaffold.`,
        );
      }
    }
  } catch (error) {
    if (/** @type {NodeJS.ErrnoException} */ (error).code !== 'ENOENT') {
      throw error;
    }
  }

  await fs.mkdir(themeDir, { recursive: true });

  for (const entry of files) {
    const fullPath = path.join(themeDir, entry.relativePath);
    await fs.writeFile(fullPath, entry.content, 'utf8');
  }

  await patchThemeScss(projectRoot, meta);

  return files.map((entry) => entry.relativePath);
}

export async function patchThemeScss(projectRoot, meta) {
  const themeScssPath = path.join(projectRoot, 'src', 'assets', 'theme', 'tokens', 'theme.scss');
  let content = await fs.readFile(themeScssPath, 'utf8');

  const usePath = `assets/theme/tokens/widgets/${meta.kebab}/tokens`;
  const useLine = `@use '${usePath}' as ${meta.sassAlias};`;

  if (!content.includes(usePath)) {
    const widgetUseRe = /@use 'assets\/theme\/tokens\/widgets\/[^']+\/tokens'[^\n]*\n/g;
    const matches = [...content.matchAll(widgetUseRe)];
    const lastWidgetUse = matches.at(-1)?.[0];
    if (lastWidgetUse) {
      content = content.replace(lastWidgetUse, `${lastWidgetUse}${useLine}\n`);
    } else {
      throw new Error('Could not find widget @use block in theme.scss to patch.');
    }
  }

  const includeCall = `@include ${meta.sassAlias}.${meta.kebab}-root-tokens;`;
  if (!content.includes(includeCall)) {
    const includeRe = /@include [a-z_]+\.[a-z0-9-]+-root-tokens;/g;
    const includes = [...content.matchAll(includeRe)];
    const lastInclude = includes.at(-1)?.[0];
    if (lastInclude) {
      content = content.replace(lastInclude, `${lastInclude}\n    ${includeCall}`);
    } else {
      throw new Error('Could not find widget @include block in theme.scss to patch.');
    }
  }

  await fs.writeFile(themeScssPath, content, 'utf8');
}

export function buildFileTree(meta) {
  const m = meta;
  const t = m.Pascal;
  const c = m.camel;
  const screaming = t.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();

  return [
    file('index.ts', `export * from './public';\n`),
    file(
      'public.ts',
      `export { ${m.defaultsConst}, ${m.resolveConfig} } from './config';\nexport type {\n  ${m.propsType},\n  ${m.blockProps},\n  ${m.configType},\n  ${m.layoutKey},\n  ${m.menuItem},\n  ${m.menuModel},\n  ${m.sectionProps},\n  ${m.sectionType},\n  ${m.typeKey},\n} from './types';\nexport { ${m.rootComponent} as ${m.appExportName} } from './ui/${m.rootComponent}';\n`,
    ),
    file(
      'types/index.ts',
      `export type { ${m.configType}, ${m.layoutKey}, ${m.typeKey} } from './config.types';\nexport type {\n  ${m.blockProps},\n  ${m.menuItem},\n  ${m.menuModel},\n  ${m.propsType},\n  ${m.sectionProps},\n  ${m.sectionType},\n} from './props.types';\n`,
    ),
    file(
      'types/config.types.ts',
      `export type ${m.layoutKey} = 'container' | 'container-fluid';\n\nexport type ${m.typeKey} = 'default' | 'classic';\n\nexport type ${m.configType} = {\n  layout: ${m.layoutKey};\n  type: ${m.typeKey};\n};\n`,
    ),
    file(
      'types/props.types.ts',
      `import type { ${m.configType} } from './config.types';\n\nexport type ${m.menuItem} = {\n  key: string;\n  name: string;\n  url: string;\n};\n\nexport type ${m.sectionType} = {\n  key: string;\n  items: ${m.menuItem}[];\n};\n\nexport type ${m.menuModel} = {\n  sections: ${m.sectionType}[];\n};\n\nexport type ${m.propsType} = {\n  menu: ${m.menuModel};\n  config: ${m.configType};\n  className?: string;\n};\n\nexport type ${m.blockProps} = {\n  item: ${m.menuItem};\n};\n\nexport type ${m.sectionProps} = {\n  section: ${m.sectionType};\n};\n`,
    ),
    file(
      'config/index.ts',
      `export { ${m.defaultsConst} } from './defaults';\nexport { ${m.resolveConfig} } from './resolve';\n`,
    ),
    file(
      'config/defaults.ts',
      `import type { ${m.configType} } from '../types';\n\nexport const ${m.defaultsConst}: ${m.configType} = {\n  layout: 'container',\n  type: 'default',\n};\n`,
    ),
    file(
      'config/resolve.ts',
      `import type { ${m.configType}, ${m.layoutKey}, ${m.typeKey} } from '../types';\n\nimport { getSettings } from '@/shared/config';\nimport { pickUnionValue } from '@/shared/lib/coercion';\n\nimport { ${m.defaultsConst} } from './defaults';\n\nconst LAYOUT_KEYS = ['container', 'container-fluid'] as const satisfies readonly ${m.layoutKey}[];\nconst TYPE_KEYS = ['default', 'classic'] as const satisfies readonly ${m.typeKey}[];\n\n/** Resolves widget config from \`window.__SETTINGS__.${c}\` with defaults. */\nexport function ${m.resolveConfig}(settings = getSettings()): ${m.configType} {\n  const section = (settings as { ${c}?: Partial<${m.configType}> }).${c};\n\n  return {\n    layout: pickUnionValue(LAYOUT_KEYS, section?.layout, ${m.defaultsConst}.layout),\n    type: pickUnionValue(TYPE_KEYS, section?.type, ${m.defaultsConst}.type),\n  };\n}\n`,
    ),
    file('lib/index.ts', `/** Pure helpers for ${m.kebab} — no React, no API. */\n`),
    file(
      'registry/index.ts',
      `export { BLOCK_REGISTRY, resolveBlockComponent } from './blocks';\nexport { LAYOUT_REGISTRY } from './layouts';\nexport { TYPE_STRATEGY_REGISTRY } from './strategies';\n`,
    ),
    file(
      'registry/blocks.ts',
      `import type { ${m.blockProps}, ${m.menuItem} } from '../types';\nimport type { ComponentType } from 'react';\n\nimport { DefaultBlock } from '../ui/blocks/DefaultBlock/DefaultBlock';\n\nexport const BLOCK_REGISTRY: Record<'default', ComponentType<${m.blockProps}>> = {\n  default: DefaultBlock,\n};\n\nexport function resolveBlockComponent(_item: ${m.menuItem}): ComponentType<${m.blockProps}> {\n  return BLOCK_REGISTRY.default;\n}\n`,
    ),
    file(
      'registry/layouts.ts',
      `import type { ${m.layoutKey} } from '../types';\nimport type { ComponentType } from 'react';\n\nimport { ContainerFluidLayout } from '../ui/layouts/ContainerFluidLayout/ContainerFluidLayout';\nimport { ContainerLayout } from '../ui/layouts/ContainerLayout/ContainerLayout';\n\nexport const LAYOUT_REGISTRY: Record<\n  ${m.layoutKey},\n  ComponentType<{ children: React.ReactNode }>\n> = {\n  container: ContainerLayout,\n  'container-fluid': ContainerFluidLayout,\n};\n`,
    ),
    file(
      'registry/strategies.ts',
      `import type { ${m.propsType}, ${m.typeKey} } from '../types';\nimport type { ComponentType } from 'react';\n\nimport { ClassicTypeStrategy } from '../ui/type/ClassicTypeStrategy';\nimport { DefaultTypeStrategy } from '../ui/type/DefaultTypeStrategy';\n\nexport const TYPE_STRATEGY_REGISTRY: Record<${m.typeKey}, ComponentType<${m.propsType}>> = {\n  default: DefaultTypeStrategy,\n  classic: ClassicTypeStrategy,\n};\n`,
    ),
    file(
      `ui/${m.rootComponent}.tsx`,
      `import type { ${m.propsType} } from '../types';\n\nimport { memo } from 'react';\n\nimport clsx from 'clsx';\n\nimport { TYPE_STRATEGY_REGISTRY } from '../registry/strategies';\n\nimport styles from '../styles/base/${m.rootComponent}.module.scss';\n\nfunction ${m.rootComponent}Component({ menu, config, className }: ${m.propsType}) {\n  const TypeStrategy = TYPE_STRATEGY_REGISTRY[config.type];\n\n  return (\n    <${m.rootElement}\n      className={clsx(styles.root, className)}\n      data-widget="${m.kebab}"\n      data-cmf-component="${m.kebab}"\n      data-layout={config.layout}\n      data-type={config.type}\n    >\n      <TypeStrategy menu={menu} config={config} />\n    </${m.rootElement}>\n  );\n}\n\nexport const ${m.rootComponent} = memo(${m.rootComponent}Component);\n${m.rootComponent}.displayName = '${m.rootComponent}';\n`,
    ),
    file(
      `ui/${m.appExportName}.tsx`,
      `export { ${m.rootComponent} as ${m.appExportName} } from './${m.rootComponent}';\n`,
    ),
    file(
      `ui/${m.shell}.tsx`,
      `import type { ${m.propsType} } from '../types';\n\nimport { memo } from 'react';\n\nimport { Group } from '@mantine/core';\n\nimport { LAYOUT_REGISTRY } from '../registry/layouts';\n\nimport { ${m.section} } from './${m.section}';\n\nimport styles from '../styles/base/${m.shell}.module.scss';\n\ntype ${m.shell}Props = Pick<${m.propsType}, 'menu' | 'config'>;\n\nfunction ${m.shell}Component({ menu, config }: ${m.shell}Props) {\n  const Layout = LAYOUT_REGISTRY[config.layout];\n\n  return (\n    <Layout>\n      <Group className={styles.sections} justify="space-between" wrap="nowrap" gap="md">\n        {menu.sections.map((section) => (\n          <${m.section} key={section.key} section={section} />\n        ))}\n      </Group>\n    </Layout>\n  );\n}\n\nexport const ${m.shell} = memo(${m.shell}Component);\n${m.shell}.displayName = '${m.shell}';\n`,
    ),
    file(
      `ui/${m.section}.tsx`,
      `import type { ${m.sectionProps} } from '../types';\n\nimport { memo } from 'react';\n\nimport { Group } from '@mantine/core';\n\nimport { ${m.block} } from './${m.block}';\n\nimport styles from '../styles/base/${m.section}.module.scss';\n\nfunction ${m.section}Component({ section }: ${m.sectionProps}) {\n  return (\n    <Group className={styles.root} gap="xs" wrap="nowrap" data-section-key={section.key}>\n      {section.items.map((item) => (\n        <${m.block} key={item.key} item={item} />\n      ))}\n    </Group>\n  );\n}\n\nexport const ${m.section} = memo(${m.section}Component);\n${m.section}.displayName = '${m.section}';\n`,
    ),
    file(
      `ui/${m.block}.tsx`,
      `import type { ${m.blockProps} } from '../types';\n\nimport { memo } from 'react';\n\nimport { resolveBlockComponent } from '../registry/blocks';\n\nfunction ${m.block}Component({ item }: ${m.blockProps}) {\n  const BlockComponent = resolveBlockComponent(item);\n  return <BlockComponent item={item} />;\n}\n\nexport const ${m.block} = memo(${m.block}Component);\n${m.block}.displayName = '${m.block}';\n`,
    ),
    file(
      'ui/blocks/DefaultBlock/DefaultBlock.tsx',
      `import type { ${m.blockProps} } from '../../../types';\n\nimport { memo } from 'react';\n\nimport styles from '../../../styles/blocks/DefaultBlock.module.scss';\n\nfunction DefaultBlockComponent({ item }: ${m.blockProps}) {\n  return (\n    <div className={styles.root} data-block-key={item.key}>\n      element default\n    </div>\n  );\n}\n\nexport const DefaultBlock = memo(DefaultBlockComponent);\nDefaultBlock.displayName = 'DefaultBlock';\n`,
    ),
    file(
      'ui/layouts/ContainerLayout/ContainerLayout.tsx',
      `import { memo, type ReactNode } from 'react';\n\nimport { Container } from '@mantine/core';\n\nimport styles from '../../../styles/layout/ContainerLayout.module.scss';\n\ntype ContainerLayoutProps = {\n  children: ReactNode;\n};\n\nfunction ContainerLayoutComponent({ children }: ContainerLayoutProps) {\n  return (\n    <Container className={styles.root} size="responsive">\n      {children}\n    </Container>\n  );\n}\n\nexport const ContainerLayout = memo(ContainerLayoutComponent);\nContainerLayout.displayName = 'ContainerLayout';\n`,
    ),
    file(
      'ui/layouts/ContainerFluidLayout/ContainerFluidLayout.tsx',
      `import { memo, type ReactNode } from 'react';\n\nimport { Container } from '@mantine/core';\n\nimport styles from '../../../styles/layout/ContainerFluidLayout.module.scss';\n\ntype ContainerFluidLayoutProps = {\n  children: ReactNode;\n};\n\nfunction ContainerFluidLayoutComponent({ children }: ContainerFluidLayoutProps) {\n  return (\n    <Container className={styles.root} fluid>\n      {children}\n    </Container>\n  );\n}\n\nexport const ContainerFluidLayout = memo(ContainerFluidLayoutComponent);\nContainerFluidLayout.displayName = 'ContainerFluidLayout';\n`,
    ),
    file(
      'ui/type/DefaultTypeStrategy.tsx',
      `import type { ${m.propsType} } from '../../types';\n\nimport { memo } from 'react';\n\nimport { ${m.shell} } from '../${m.shell}';\n\nfunction DefaultTypeStrategyComponent({ menu, config }: ${m.propsType}) {\n  return <${m.shell} menu={menu} config={config} />;\n}\n\nexport const DefaultTypeStrategy = memo(DefaultTypeStrategyComponent);\nDefaultTypeStrategy.displayName = 'DefaultTypeStrategy';\n`,
    ),
    file(
      'ui/type/ClassicTypeStrategy.tsx',
      `import type { ${m.propsType} } from '../../types';\n\nimport { memo } from 'react';\n\nimport clsx from 'clsx';\n\nimport { ${m.shell} } from '../${m.shell}';\n\nimport styles from '../../styles/variant/type-classic.module.scss';\n\nfunction ClassicTypeStrategyComponent({ menu, config }: ${m.propsType}) {\n  return (\n    <div className={clsx(styles.root)} data-type-strategy="classic">\n      <${m.shell} menu={menu} config={config} />\n    </div>\n  );\n}\n\nexport const ClassicTypeStrategy = memo(ClassicTypeStrategyComponent);\nClassicTypeStrategy.displayName = 'ClassicTypeStrategy';\n`,
    ),
    file(
      'styles/_layers.scss',
      `// ${t} widget SCSS layers (nested under global \`widget\`).\n// widget.base    — shell, surface tokens, sections\n// widget.layout  — container / container-fluid wrappers\n// widget.blocks  — domain blocks\n// widget.menu    — menu primitives (button, dropdown, icon)\n// widget.variant — type/shape overrides via CSS vars on .root[data-type]\n// Tokens: src/assets/theme/tokens/widgets/${m.kebab}/\n`,
    ),
    file(
      'styles/_mixins.scss',
      `// ${t} menu SCSS mixins — injected for widgets/${m.kebab}/styles/** (see build/scss-config.ts).\n\n@use 'assets/styles/mixins/a11y' as a11y;\n@use 'assets/theme/tokens/global/cmf-icon-tokens' as cmf-icon;\n\n@mixin ${m.kebab}-menu-control-height {\n  min-height: var(--button-height, calc(2.25rem * var(--mantine-scale, 1)));\n  height: var(--button-height, calc(2.25rem * var(--mantine-scale, 1)));\n}\n\n@mixin ${m.kebab}-menu-action-icon-control {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  width: var(--ai-size, calc(2.25rem * var(--mantine-scale, 1)));\n  min-width: var(--ai-size, calc(2.25rem * var(--mantine-scale, 1)));\n  height: var(--ai-size, calc(2.25rem * var(--mantine-scale, 1)));\n  min-height: var(--ai-size, calc(2.25rem * var(--mantine-scale, 1)));\n}\n\n@mixin ${m.kebab}-menu-glyph-icon {\n  @include cmf-icon.cmf-menu-glyph-icon;\n}\n\n@mixin ${m.kebab}-menu-button-control {\n  @include ${m.kebab}-menu-control-height;\n}\n\n@mixin ${m.kebab}-menu-icon {\n  @include cmf-icon.cmf-menu-media-icon;\n}\n`,
    ),
    file(
      `styles/base/${m.rootComponent}.module.scss`,
      `@use '../variant/type-default';\n\n@layer widget.base {\n  .root {\n    width: 100%;\n    background: var(--${m.cssPrefix}-surface-bg, transparent);\n    border-bottom: var(--${m.cssPrefix}-surface-border-width, 0) solid\n      var(--${m.cssPrefix}-surface-border-color, transparent);\n    box-shadow: var(--${m.cssPrefix}-surface-shadow, none);\n    backdrop-filter: var(--${m.cssPrefix}-surface-backdrop-filter, none);\n    color: var(--${m.cssPrefix}-text-color, var(--color-text, inherit));\n    min-height: var(--${m.cssPrefix}-height, auto);\n    padding: var(--${m.cssPrefix}-padding-y, 10px) var(--${m.cssPrefix}-padding-x, 0);\n  }\n}\n`,
    ),
    file(
      `styles/base/${m.shell}.module.scss`,
      `@layer widget.base {\n  .sections {\n    width: 100%;\n  }\n}\n`,
    ),
    file(
      `styles/base/${m.section}.module.scss`,
      `@layer widget.base {\n  .root {\n    min-width: 0;\n  }\n}\n`,
    ),
    file(
      'styles/layout/ContainerLayout.module.scss',
      `@layer widget.layout {\n  .root {\n    width: 100%;\n  }\n}\n`,
    ),
    file(
      'styles/layout/ContainerFluidLayout.module.scss',
      `@layer widget.layout {\n  .root {\n    width: 100%;\n  }\n}\n`,
    ),
    file(
      'styles/blocks/DefaultBlock.module.scss',
      `@layer widget.blocks {\n  .root {\n    min-width: 0;\n  }\n}\n`,
    ),
    file(
      'styles/variant/index.scss',
      `@forward 'type-default';\n`,
    ),
    file(
      'styles/variant/type-default.scss',
      `@layer widget.variant {\n  .root[data-type='default'] {\n    --${m.cssPrefix}-surface-bg: var(--${m.cssPrefix}-surface-bg, transparent);\n  }\n\n  // Example overrides:\n  // .root[data-type='classic'] {\n  //   --${m.cssPrefix}-surface-bg: var(--color-bg-body, #0f172a);\n  //   --${m.cssPrefix}-surface-border-color: var(--color-border, #1e293b);\n  //   --${m.cssPrefix}-surface-border-width: 1px;\n  // }\n}\n`,
    ),
    file(
      'styles/variant/type-classic.module.scss',
      `@layer widget.variant {\n  .root {\n    width: 100%;\n  }\n}\n`,
    ),
  ];
}

export async function writeModule(baseDir, meta, { force = false, projectRoot = process.cwd() } = {}) {
  const files = buildFileTree(meta);
  const themeFiles = isWidgetModuleDir(baseDir) ? await writeThemeTokens(projectRoot, meta, { force }) : [];
  const m = meta;
  const c = m.camel;
  const testRelativePath = `test/widgets/${m.kebab}/resolve.test.ts`;
  const testContent = `import { describe, expect, it } from 'vitest';

import { ${m.resolveConfig} } from '@/widgets/${m.kebab}/config/resolve';

describe('${m.resolveConfig}', () => {
  it('returns defaults when settings section is missing', () => {
    expect(${m.resolveConfig}({})).toEqual({ layout: 'container', type: 'default' });
  });

  it('reads layout and type from settings', () => {
    expect(
      ${m.resolveConfig}({
        ${c}: { layout: 'container-fluid', type: 'classic' },
      } as never),
    ).toEqual({ layout: 'container-fluid', type: 'classic' });
  });
});
`;

  try {
    const stat = await fs.stat(baseDir);
    if (stat.isDirectory()) {
      const entries = await fs.readdir(baseDir);
      if (entries.length > 0 && !force) {
        throw new Error(
          `Target directory is not empty: ${baseDir}\nUse --force to scaffold into a non-empty directory.`,
        );
      }
    }
  } catch (error) {
    if (/** @type {NodeJS.ErrnoException} */ (error).code !== 'ENOENT') {
      throw error;
    }
  }

  await fs.mkdir(baseDir, { recursive: true });

  for (const entry of files) {
    const fullPath = path.join(baseDir, entry.relativePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, entry.content, 'utf8');
  }

  const testFullPath = path.join(projectRoot, testRelativePath);
  await fs.mkdir(path.dirname(testFullPath), { recursive: true });
  await fs.writeFile(testFullPath, testContent, 'utf8');

  return [
    ...files.map((entry) => entry.relativePath),
    testRelativePath,
    ...themeFiles.map((f) => `src/assets/theme/tokens/widgets/${meta.kebab}/${f}`),
  ];
}
