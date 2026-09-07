import type { CmfScope } from '../cmf/cmfCascadeResolve';

import { buildPopoverPropToken, resolveCmfScope } from '../cmf/cmfCascadeResolve';

/** Clear Mantine Popover dropdown inline vars before nestCssVars. */
export const CLEAR_POPOVER_INLINE_VARS = {
  '--popover-radius': null,
  '--popover-shadow': null,
} as const;

function resolvePopoverRadiusProp(radius: unknown): string {
  if (typeof radius === 'number' && Number.isFinite(radius)) {
    return `${radius}px`;
  }
  if (typeof radius === 'string' && radius.trim().length > 0) {
    const value = radius.trim();
    if (value.startsWith('var(') || value.includes('rem') || value.includes('px')) {
      return value;
    }
    return `var(--mantine-radius-${value})`;
  }
  return 'var(--mantine-radius-default)';
}

function resolvePopoverShadowProp(shadow: unknown): string {
  if (typeof shadow === 'string' && shadow.trim().length > 0) {
    const value = shadow.trim();
    if (value.startsWith('var(') || value.includes(' ') || value.includes('px')) {
      return value;
    }
    return `var(--mantine-shadow-${value})`;
  }
  return 'var(--mantine-shadow-xs)';
}

/**
 * Private paint vars for Popover dropdown / arrow / overlay.
 * Must not write bare `--popover-bg` on the panel (cycle with `:root`).
 * Honors Mantine `radius` / `shadow` props as last-resort fallbacks (settings / instance).
 */
export function resolvePopoverDropdownVars(props: Record<string, unknown>): Record<string, string> {
  const scope: CmfScope = resolveCmfScope(props);
  const t = (prop: string, fallback: string) => buildPopoverPropToken(prop, fallback, { scope });

  const radiusFallback = resolvePopoverRadiusProp(props.radius);
  const shadowFallback = resolvePopoverShadowProp(props.shadow);

  return {
    '--_cmf-popover-bg': t(
      'bg',
      'light-dark(var(--mantine-color-body), var(--mantine-color-dark-7))',
    ),
    '--_cmf-popover-color': t('color', 'var(--mantine-color-text)'),
    '--_cmf-popover-radius': t('radius', radiusFallback),
    '--_cmf-popover-shadow': t('shadow', shadowFallback),
    '--_cmf-popover-padding': t('padding', 'var(--mantine-spacing-sm)'),
    '--_cmf-popover-bd': t('bd', '1px solid var(--color-border, transparent)'),
    '--_cmf-popover-arrow-bg': t(
      'arrow-bg',
      'var(--_cmf-popover-bg, var(--popover-bg, var(--mantine-color-body)))',
    ),
  };
}
