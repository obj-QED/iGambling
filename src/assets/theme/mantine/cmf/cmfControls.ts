/** Mantine components excluded from CMF scope (layout shell only). */
export const CMF_EXCLUDED_MANTINE_COMPONENTS = ['container'] as const;

/**
 * CMF control slugs — token prefix `--cmf-{slug}-*`.
 * Mantine class: `cmf-{ComponentName}-root` (see `classNamesPrefix`).
 */
export const CMF_MANTINE_CONTROL_SLUGS = {
  ActionIcon: 'action-icon',
  Button: 'button',
  Code: 'code',
  Collapse: 'collapse',
  Group: 'group',
  Menu: 'menu',
  SegmentedControl: 'segmented-control',
  Stack: 'stack',
  Switch: 'switch',
  Text: 'text',
  TextInput: 'text-input',
  Title: 'title',
  UnstyledButton: 'unstyled-button',
} as const;

export type CmfMantineComponentName = keyof typeof CMF_MANTINE_CONTROL_SLUGS;

export type CmfControlSlug = (typeof CMF_MANTINE_CONTROL_SLUGS)[CmfMantineComponentName];

export function toCmfControlSlug(componentName: string): string {
  const mapped = CMF_MANTINE_CONTROL_SLUGS[componentName as CmfMantineComponentName];
  if (mapped !== undefined) return mapped;

  return componentName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

export function cmfMantineRootClass(componentName: CmfMantineComponentName): string {
  return `cmf-${componentName}-root`;
}
