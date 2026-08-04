import path from 'node:path';

const ROOT_ALIASES = {
  widget: 'src/widgets',
  widgets: 'src/widgets',
  feature: 'src/features',
  features: 'src/features',
  page: 'src/pages',
  pages: 'src/pages',
  entity: 'src/entities',
  entities: 'src/entities',
  component: 'src/shared/ui',
  ui: 'src/shared/ui',
};

export function toKebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

export function toPascal(value) {
  return toKebab(value)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function toCamel(value) {
  const pascal = toPascal(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function resolveParentDir(cwd, pathPart) {
  if (ROOT_ALIASES[pathPart] !== undefined) {
    return path.join(cwd, ROOT_ALIASES[pathPart]);
  }

  if (pathPart.startsWith('src/') || pathPart.startsWith('src\\')) {
    return path.join(cwd, pathPart);
  }

  return path.join(cwd, 'src', pathPart);
}

/** `widget:Sidebar` → src/widgets/sidebar, names from `Sidebar`. */
export function parseColonSpec(cwd, spec) {
  const colonIndex = spec.indexOf(':');

  if (colonIndex <= 0 || colonIndex === spec.length - 1) {
    throw new Error('Use path:ModuleName — example: yarn scaffold widget:Sidebar');
  }

  const pathPart = spec.slice(0, colonIndex).trim();
  const moduleName = spec.slice(colonIndex + 1).trim();
  const kebabName = toKebab(moduleName);

  if (kebabName.length === 0) {
    throw new Error('Module name is empty. Example: yarn scaffold widget:Sidebar');
  }

  return {
    dir: path.join(resolveParentDir(cwd, pathPart), kebabName),
    kebabName,
    moduleName,
  };
}

export function resolveTarget(cwd, args) {
  if (args.length === 0) {
    throw new Error(
      'Usage: yarn scaffold path:ModuleName\nExamples:\n  yarn scaffold widget:Sidebar\n  yarn scaffold src/widgets:PromoBanner',
    );
  }

  const [targetArg, nameArg] = args;

  if (targetArg.includes(':')) {
    if (nameArg !== undefined) {
      throw new Error('Use a single path:ModuleName argument. Example: yarn scaffold widget:Sidebar');
    }

    return parseColonSpec(cwd, targetArg);
  }

  if (nameArg !== undefined) {
    const kebabName = toKebab(nameArg);

    if (ROOT_ALIASES[targetArg] !== undefined) {
      return {
        dir: path.join(cwd, ROOT_ALIASES[targetArg], kebabName),
        kebabName,
        moduleName: nameArg,
      };
    }

    if (targetArg.startsWith('src/') || targetArg.includes('/')) {
      return {
        dir: path.join(cwd, targetArg, kebabName),
        kebabName,
        moduleName: nameArg,
      };
    }

    return {
      dir: path.join(cwd, 'src', targetArg, kebabName),
      kebabName,
      moduleName: nameArg,
    };
  }

  if (ROOT_ALIASES[targetArg] !== undefined) {
    throw new Error(`Missing module name. Example: yarn scaffold ${targetArg}:Sidebar`);
  }

  const kebabName = toKebab(path.basename(targetArg));

  return {
    dir: path.join(cwd, targetArg),
    kebabName,
    moduleName: kebabName,
  };
}

export function rootElement(kebabName) {
  if (kebabName.includes('footer')) return 'footer';
  if (kebabName.includes('banner')) return 'section';
  if (kebabName.includes('sidebar') || kebabName.includes('aside')) return 'aside';
  if (kebabName.includes('header')) return 'header';
  if (kebabName.includes('nav')) return 'nav';
  return 'div';
}

export function buildMeta(kebabName) {
  const Pascal = toPascal(kebabName);
  const camel = toCamel(kebabName);

  return {
    kebab: kebabName,
    Pascal,
    camel,
    sassAlias: kebabName.replace(/-/g, '_'),
    menuSizeDefault: kebabName.includes('sidebar') || kebabName.includes('aside') ? 'md' : 'sm',
    rootComponent: 'Root',
    shell: 'Shell',
    section: 'Section',
    block: 'Block',
    configType: `${Pascal}Config`,
    layoutKey: `${Pascal}LayoutKey`,
    typeKey: `${Pascal}TypeKey`,
    menuModel: `${Pascal}MenuModel`,
    menuItem: `${Pascal}MenuItem`,
    sectionType: `${Pascal}Section`,
    blockProps: 'BlockProps',
    sectionProps: 'SectionProps',
    propsType: 'RootProps',
    defaultsConst: `DEFAULT_${Pascal.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()}_CONFIG`,
    resolveConfig: `resolve${Pascal}Config`,
    rootElement: rootElement(kebabName),
    cssPrefix: kebabName,
    /** Public export alias for app layout (e.g. AppSidebar). */
    appExportName: `App${Pascal}`,
  };
}

export function isWidgetModuleDir(dir) {
  const normalized = dir.replace(/\\/g, '/');
  return normalized.includes('/src/widgets/') || normalized.endsWith('/widgets');
}
