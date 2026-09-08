import type { CmfScope } from '../cmf/cmfCascadeResolve';

import {
  buildDrawerPropToken,
  buildDrawerViewportSizeToken,
  resolveCmfScope,
} from '../cmf/cmfCascadeResolve';

/**
 * Private paint + layout vars for Drawer panel / parts / overlay.
 * Must not write `--cmf-drawer-bg` / `--cmf-drawer-size` on the panel (cycle with `:root`).
 *
 * Nest (with `data-cmf-component` + `data-cmf-key`):
 *   `--drawer-{component}-{key}-{prop}` → `--drawer-{component}-{prop}` → `--drawer-{prop}`
 *
 * Viewport size (`size-mobile|tablet|…`): key `size-{band}` → key `size` → base
 * `size-{band}` → `--cmf-drawer-size`. So `@media { --cmf-drawer-layout-sidebar-size }`
 * wins without requiring `--cmf-drawer-layout-sidebar-size-tablet`.
 */
export function resolveDrawerRootVars(props: Record<string, unknown>): Record<string, string> {
  const scope: CmfScope = resolveCmfScope(props);
  const t = (prop: string, fallback: string) => buildDrawerPropToken(prop, fallback, { scope });
  const tv = (band: 'mobile' | 'tablet' | 'laptop' | 'pc', fallback: string) =>
    buildDrawerViewportSizeToken(band, fallback, { scope });

  return {
    '--_cmf-drawer-bg': t(
      'bg',
      'light-dark(var(--mantine-color-body), var(--mantine-color-dark-7))',
    ),
    '--_cmf-drawer-color': t('color', 'var(--mantine-color-text)'),
    '--_cmf-drawer-radius': t('radius', '0'),
    '--_cmf-drawer-padding': t('padding', 'var(--mantine-spacing-md)'),
    '--_cmf-drawer-shadow': t('shadow', 'var(--mantine-shadow-xs)'),
    '--_cmf-drawer-offset': t('offset', '0'),
    '--_cmf-drawer-inset': t('inset', '0px'),

    /* Size — key layer e.g. `--cmf-drawer-layout-sidebar-size` wins over `--cmf-drawer-size`. */
    '--_cmf-drawer-size': t('size', 'auto'),
    '--_cmf-drawer-size-mobile': tv('mobile', '100%'),
    '--_cmf-drawer-size-tablet': tv('tablet', '35vw'),
    '--_cmf-drawer-size-laptop': tv('laptop', 'auto'),
    '--_cmf-drawer-size-pc': tv('pc', 'auto'),

    '--_cmf-drawer-header-padding': t(
      'header-padding',
      'var(--_cmf-drawer-padding, var(--mantine-spacing-md))',
    ),
    '--_cmf-drawer-header-min-height': t(
      'header-min-height',
      'calc(3.75rem * var(--mantine-scale))',
    ),

    '--_cmf-drawer-title-fz': t('title-fz', 'var(--mantine-font-size-lg)'),
    '--_cmf-drawer-title-fw': t('title-fw', 'var(--mantine-h4-font-weight, 700)'),
    '--_cmf-drawer-title-lh': t('title-lh', 'var(--mantine-line-height-md)'),
    '--_cmf-drawer-title-color': t('title-color', 'inherit'),

    '--_cmf-drawer-close-size': t('close-size', 'calc(2rem * var(--mantine-scale))'),
    '--_cmf-drawer-close-icon-size': t('close-icon-size', '70%'),
    '--_cmf-drawer-close-color': t('close-color', 'var(--brand-color-6)'),
    '--_cmf-drawer-close-hover-bg': t('close-hover-bg', 'var(--mantine-color-default-hover)'),
    '--_cmf-drawer-close-radius': t('close-radius', 'var(--mantine-radius-default)'),

    '--_cmf-drawer-overlay-opacity': t('overlay-opacity', '0.35'),
    '--_cmf-drawer-overlay-blur': t('overlay-blur', '4px'),
  };
}
