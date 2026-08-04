import type { CSSProperties } from 'react';

/**
 * Local section overrides for Storybook — paint + icon cascade demos.
 * Prefer widget tokens (`[data-widget]`) in app; these are for isolated element stories.
 */
export const cmfButtonScopeOverrideStyle = {
  '--cmf-button-filled-bg': 'light-dark(var(--brand-color-7), var(--brand-color-8))',
  '--cmf-button-filled-color': '#fff',
  '--cmf-button-filled-hover': 'light-dark(var(--brand-color-6), var(--brand-color-7))',
  '--cmf-button-filled-hover-color': '#fff',
  '--cmf-button-outline-bg': 'transparent',
  '--cmf-button-outline-color': 'light-dark(var(--brand-color-7), var(--brand-color-3))',
  '--cmf-button-outline-bd':
    'color-mix(in srgb, light-dark(var(--brand-color-7), var(--brand-color-4)) 55%, var(--mantine-color-default-border))',
  '--cmf-button-outline-hover': 'color-mix(in srgb, var(--brand-color-4) 12%, transparent)',
  '--cmf-button-outline-hover-color': 'var(--color-text)',
} as CSSProperties;

export const cmfActionIconScopeOverrideStyle = {
  '--cmf-action-icon-filled-bg': 'light-dark(var(--brand-color-7), var(--brand-color-8))',
  '--cmf-action-icon-filled-color': '#fff',
  '--cmf-action-icon-filled-hover': 'light-dark(var(--brand-color-6), var(--brand-color-7))',
  '--cmf-action-icon-filled-hover-color': '#fff',
  '--cmf-action-icon-outline-bg': 'transparent',
  '--cmf-action-icon-outline-color': 'light-dark(var(--brand-color-7), var(--brand-color-3))',
  '--cmf-action-icon-outline-bd':
    'color-mix(in srgb, light-dark(var(--brand-color-7), var(--brand-color-4)) 55%, var(--mantine-color-default-border))',
  '--cmf-action-icon-outline-hover': 'color-mix(in srgb, var(--brand-color-4) 12%, transparent)',
  '--cmf-action-icon-outline-hover-color': 'var(--color-text)',
} as CSSProperties;

export type CmfIconCascadeDemoOptions = {
  scale?: string | number;
  aspect?: string | number;
  width?: string;
  height?: string;
};

/** Theme-level `--cmf-icon-*` — last cascade step before SCSS auto. */
export function cmfIconCascadeStyle({
  scale,
  aspect,
  width,
  height,
}: CmfIconCascadeDemoOptions = {}): CSSProperties {
  const style: Record<string, string> = {};
  if (scale !== undefined) style['--cmf-icon-scale'] = String(scale);
  if (aspect !== undefined) style['--cmf-icon-aspect'] = String(aspect);
  if (width !== undefined) style['--cmf-icon-width'] = width;
  if (height !== undefined) style['--cmf-icon-height'] = height;
  return style as CSSProperties;
}

/** Control-shared tokens: `--cmf-button-icon-*` / `--cmf-action-icon-icon-*`. */
export function cmfControlIconCascadeStyle(
  control: 'button' | 'action-icon',
  { scale, aspect, width, height }: CmfIconCascadeDemoOptions = {},
): CSSProperties {
  const prefix = control === 'button' ? '--cmf-button' : '--cmf-action-icon';
  const style: Record<string, string> = {};
  if (scale !== undefined) style[`${prefix}-icon-scale`] = String(scale);
  if (aspect !== undefined) style[`${prefix}-icon-aspect`] = String(aspect);
  if (width !== undefined) style[`${prefix}-icon-width`] = width;
  if (height !== undefined) style[`${prefix}-icon-height`] = height;
  return style as CSSProperties;
}

/**
 * Component-scoped tokens for menu demos with `data-cmf-component`.
 * e.g. `header` → `--cmf-button-header-icon-scale`.
 */
export function cmfComponentIconCascadeStyle(
  control: 'button' | 'action-icon',
  component: string,
  { scale, aspect, width, height }: CmfIconCascadeDemoOptions = {},
): CSSProperties {
  const prefix =
    control === 'button' ? `--cmf-button-${component}` : `--cmf-action-icon-${component}`;
  const style: Record<string, string> = {};
  if (scale !== undefined) style[`${prefix}-icon-scale`] = String(scale);
  if (aspect !== undefined) style[`${prefix}-icon-aspect`] = String(aspect);
  if (width !== undefined) style[`${prefix}-icon-width`] = width;
  if (height !== undefined) style[`${prefix}-icon-height`] = height;
  return style as CSSProperties;
}
