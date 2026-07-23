import type { CSSProperties } from 'react';

/**
 * Local section overrides for Storybook — paint + icon cascade demos.
 * Prefer widget tokens (`[data-widget]`) in app; these are for isolated element stories.
 */
export const cmfButtonScopeOverrideStyle = {
  '--cmf-button-filled-bg': 'var(--mantine-color-brand-5)',
  '--cmf-button-filled-color': '#fff',
  '--cmf-button-filled-hover': 'var(--mantine-color-brand-4)',
  '--cmf-button-filled-hover-color': '#fff',
  '--cmf-button-outline-bg': 'transparent',
  '--cmf-button-outline-color': 'var(--mantine-color-brand-2)',
  '--cmf-button-outline-bd': '1px solid var(--mantine-color-brand-3)',
  '--cmf-button-outline-hover': 'color-mix(in srgb, var(--mantine-color-brand-4) 12%, transparent)',
  '--cmf-button-outline-hover-color': 'var(--mantine-color-brand-1)',
} as CSSProperties;

export const cmfActionIconScopeOverrideStyle = {
  '--cmf-action-icon-filled-bg': 'var(--mantine-color-brand-5)',
  '--cmf-action-icon-filled-color': '#fff',
  '--cmf-action-icon-filled-hover': 'var(--mantine-color-brand-4)',
  '--cmf-action-icon-filled-hover-color': '#fff',
  '--cmf-action-icon-outline-bg': 'transparent',
  '--cmf-action-icon-outline-color': 'var(--mantine-color-brand-2)',
  '--cmf-action-icon-outline-bd': '1px solid var(--mantine-color-brand-3)',
  '--cmf-action-icon-outline-hover':
    'color-mix(in srgb, var(--mantine-color-brand-4) 12%, transparent)',
  '--cmf-action-icon-outline-hover-color': 'var(--mantine-color-brand-1)',
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
