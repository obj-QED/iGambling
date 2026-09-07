import type { CmfScope } from '../cmf/cmfCascadeResolve';

import { buildCmfModalPropToken, resolveCmfScope } from '../cmf/cmfCascadeResolve';

/** Clear Mantine Modal root inline vars before nestCssVars. */
export const CLEAR_MODAL_INLINE_VARS = {
  '--modal-radius': null,
  '--modal-size': null,
  '--modal-y-offset': null,
  '--modal-x-offset': null,
} as const;

/**
 * Modal CSS vars via CMF nest (always — default + optional `data-cmf-*`).
 * Panel: radius | size | y-offset | x-offset | bg | color | padding | shadow
 * Parts: header-* | title-* | close-* | overlay-*
 * Nest: key → component → `--cmf-modal-{prop}` → fallback.
 */
export function resolveModalRootVars(props: Record<string, unknown>): Record<string, string> {
  const scope: CmfScope = resolveCmfScope(props);
  const t = (prop: string, fallback: string) => buildCmfModalPropToken(prop, fallback, { scope });

  return {
    '--modal-radius': t('radius', 'var(--mantine-radius-default)'),
    '--modal-size': t('size', 'var(--modal-size-md, 37.5rem)'),
    '--modal-y-offset': t('y-offset', '5dvh'),
    '--modal-x-offset': t('x-offset', '5vw'),
    '--modal-bg': t('bg', 'light-dark(var(--mantine-color-body), var(--mantine-color-dark-7))'),
    '--modal-color': t('color', 'var(--mantine-color-text)'),
    '--modal-padding': t('padding', 'var(--mantine-spacing-md)'),
    '--modal-shadow': t('shadow', 'var(--mantine-shadow-md)'),

    '--modal-header-padding': t(
      'header-padding',
      'var(--modal-padding, var(--mantine-spacing-md))',
    ),
    '--modal-header-min-height': t('header-min-height', 'calc(3.75rem * var(--mantine-scale))'),

    '--modal-title-fz': t('title-fz', 'var(--mantine-font-size-lg)'),
    '--modal-title-fw': t('title-fw', 'var(--mantine-h4-font-weight, 700)'),
    '--modal-title-lh': t('title-lh', 'var(--mantine-line-height-md)'),
    '--modal-title-color': t('title-color', 'inherit'),

    '--modal-close-size': t('close-size', 'calc(2rem * var(--mantine-scale))'),
    '--modal-close-icon-size': t('close-icon-size', '70%'),
    '--modal-close-color': t('close-color', 'var(--mantine-brand-color-6)'),
    '--modal-close-hover-bg': t('close-hover-bg', 'var(--mantine-color-default-hover)'),
    '--modal-close-radius': t('close-radius', 'var(--mantine-radius-default)'),

    '--modal-overlay-opacity': t('overlay-opacity', '0.55'),
    '--modal-overlay-blur': t('overlay-blur', '0px'),
  };
}
