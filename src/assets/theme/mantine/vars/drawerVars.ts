import type { CmfScope } from '../cmf/cmfCascadeResolve';

import { buildDrawerPropToken, resolveCmfScope } from '../cmf/cmfCascadeResolve';

/**
 * Private paint vars for Drawer panel / overlay / header.
 * Must not write `--drawer-bg` on the panel (cycle with `:root` aliases).
 */
export function resolveDrawerRootVars(props: Record<string, unknown>): Record<string, string> {
  const scope: CmfScope = resolveCmfScope(props);

  return {
    '--_cmf-drawer-bg': buildDrawerPropToken(
      'bg',
      'light-dark(var(--mantine-color-body), var(--mantine-color-dark-7))',
      { scope },
    ),
    '--_cmf-drawer-color': buildDrawerPropToken('color', 'var(--mantine-color-text)', { scope }),
    '--_cmf-drawer-radius': buildDrawerPropToken('radius', '0', { scope }),
    '--_cmf-drawer-padding': buildDrawerPropToken('padding', 'var(--mantine-spacing-md)', {
      scope,
    }),
    '--_cmf-drawer-shadow': buildDrawerPropToken('shadow', 'var(--mantine-shadow-md)', { scope }),
    '--_cmf-drawer-overlay-opacity': buildDrawerPropToken('overlay-opacity', '0.35', { scope }),
    '--_cmf-drawer-overlay-blur': buildDrawerPropToken('overlay-blur', '4px', { scope }),
  };
}
