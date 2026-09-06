import type { CmfScope } from '../cmf/cmfCascadeResolve';

import { CMF_BUTTON_SIZES, type CmfButtonSize } from '../cmf/cmfButtonVars';
import { buildCmfTextPropToken, resolveCmfScope } from '../cmf/cmfCascadeResolve';

/** Clear Mantine Text root inline vars before nestCssVars. */
export const CLEAR_TEXT_INLINE_VARS = {
  '--text-fz': null,
  '--text-lh': null,
} as const;

/** Semantic `c` values that get their own `--cmf-text-{c}-color` cascade segment. */
const TEXT_COLOR_VARIANTS = new Set(['dimmed', 'bright']);

function resolveTextSize(size: unknown): CmfButtonSize {
  if (typeof size === 'string' && (CMF_BUTTON_SIZES as readonly string[]).includes(size)) {
    return size as CmfButtonSize;
  }
  return 'md';
}

/**
 * Last-resort color when no `--cmf-text-*` token is set.
 * Preserves Mantine `c="dimmed"|"bright"` (and raw CSS color strings).
 */
export function resolveTextColorFallback(c: unknown): string {
  if (c === 'dimmed') return 'var(--mantine-color-dimmed)';
  if (c === 'bright') return 'var(--mantine-color-bright)';
  if (typeof c === 'string' && c.trim().length > 0) return c.trim();
  return 'var(--color-text, var(--mantine-color-text))';
}

/** Cascade variant segment for color: `dimmed` / `bright` / `default`. */
export function resolveTextColorCascadeVariant(c: unknown): string {
  if (typeof c === 'string' && TEXT_COLOR_VARIANTS.has(c)) return c;
  return 'default';
}

/**
 * Text CSS vars via CMF nest when `data-cmf-*` is set.
 * Native Mantine: fz | lh from `size`. Extra paint (theme `.text` SCSS): color.
 * Cascade: key → component → `--cmf-text-{default|dimmed|bright}-*` → parent → size table.
 * Per-size SoT (all Text, no CMF): `--font-size-{xs|sm|…}` in `tokens/theme.scss`.
 * `c="dimmed"` → fallback `var(--mantine-color-dimmed)`.
 */
export function resolveTextRootVars(props: Record<string, unknown>): Record<string, string> {
  const scope: CmfScope = resolveCmfScope(props);
  const size = resolveTextSize(props.size);
  const colorVariant = resolveTextColorCascadeVariant(props.c);

  return {
    '--text-fz': buildCmfTextPropToken('fz', `var(--mantine-font-size-${size})`, { scope }),
    '--text-lh': buildCmfTextPropToken('lh', `var(--mantine-line-height-${size})`, { scope }),
    '--text-color': buildCmfTextPropToken('color', resolveTextColorFallback(props.c), {
      scope,
      variant: colorVariant,
    }),
  };
}
