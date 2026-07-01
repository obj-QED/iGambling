import type { CSSProperties } from 'react';

/**
 * Local section overrides for Storybook — same values as `:root` in `tokens/global/cmf-button-tokens.scss`.
 * Use when a story needs a scoped override (`--cmf-header-button-*`, etc.).
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
