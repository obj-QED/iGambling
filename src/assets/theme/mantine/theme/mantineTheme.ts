import { createTheme, type CSSVariablesResolver, type MantineColorScheme } from '@mantine/core';

import { breakpointsEm } from '../../breakpoints';
import { BRAND_PALETTE_FALLBACK, createBrandColorsTuple } from '../brand/brandPalette';
import { themeComponents } from '../components/components';
import { APP_GRADIENT_DEG, APP_GRADIENT_FROM, APP_GRADIENT_TO } from './gradientTokens';

/**
 * Thin bridge: Mantine consumes design tokens from theme.scss (single source
 * of truth) via CSS variables. Only the brand palette is materialized here,
 * because Mantine requires a 10-shade tuple for primaryColor.
 */

// Color scheme is a MantineProvider prop (not a theme property), so it is
// centralized here as theme config and consumed by the provider.
export const defaultColorScheme: MantineColorScheme = 'dark';

// Mantine appends its own separator (`${prefix}-Component-selector`), so the
// prefix must NOT end with a dash. Affects only static reference classes
// (e.g. `cmf-Button-root`) used for targeting/debug — not the bundled
// styles, which are applied via hashed `.m_*` classes.
export const classNamesPrefix: string = 'cmf';

const brand = createBrandColorsTuple(BRAND_PALETTE_FALLBACK);

/**
 * Mantine 9: `cssVariablesResolver` is a **MantineProvider** prop, not `createTheme`.
 * Token SoT: `tokens/theme.scss` (`--cmf-anchor`, `--cmf-brand-text`).
 *
 * Put overrides in `light` + `dark` — not only `variables`. Scheme selectors
 * (`:root[data-mantine-color-scheme=…]`) beat plain `:root` and would keep
 * Mantine’s generated `--mantine-color-brand-text: var(--mantine-color-brand-4)`.
 */
const TOKEN_BRIDGED_COLOR_VARS = {
  '--mantine-color-anchor': 'var(--cmf-anchor-color, var(--brand-color-6))',
  '--mantine-color-brand-text': 'var(--cmf-brand-text-color, var(--brand-color-6))',
  '--mantine-color-anchor-hover': 'var(--cmf-anchor-hover, var(--brand-color-8))',
} as const;

export const mantineCssVariablesResolver: CSSVariablesResolver = () => ({
  variables: { ...TOKEN_BRIDGED_COLOR_VARS },
  light: { ...TOKEN_BRIDGED_COLOR_VARS },
  dark: { ...TOKEN_BRIDGED_COLOR_VARS },
});

export const mantineTheme = createTheme({
  focusRing: 'auto',
  autoContrast: true,
  luminanceThreshold: 0.3,
  cursorType: 'pointer',
  defaultGradient: {
    from: APP_GRADIENT_FROM,
    to: APP_GRADIENT_TO,
    deg: APP_GRADIENT_DEG,
  },

  black: 'rgba(13, 13, 13, 1)',
  white: 'rgba(255, 255, 255, 1)',
  primaryColor: 'brand',
  /* Deeper shade so filled/primary labels stay ≥ AA with white (brand-4/5 fail). */
  primaryShade: { light: 7, dark: 8 },
  colors: { brand },

  fontFamily: 'var(--font-family-base, "IBM Plex Sans", sans-serif)',
  fontSmoothing: true,
  defaultRadius: 'sm',

  shadows: {
    sm: '0 10px 15px -12px 0000001F',
    md: '0px 4px 12px 0px #0000001F',
    lg: '0px 12px 32px 0px #00000026',
  },

  radius: {
    sm: 'var(--radius-sm, 0.375rem)',
    md: 'var(--radius-md, 0.5rem)',
    lg: 'var(--radius-lg, 0.75rem)',
  },

  fontSizes: {
    xxs: 'var(--font-size-xxs, 0.625rem)',
    xs: 'var(--font-size-xs, 0.75rem)',
    sm: 'var(--font-size-sm, 0.875rem)',
    md: 'var(--font-size-md, 1rem)',
    lg: 'var(--font-size-lg, 1.125rem)',
    xl: 'var(--font-size-xl, 1.25rem)',
  },

  lineHeights: {
    xxs: 'var(--line-height-xxs, 1)',
    xs: 'var(--line-height-xs, 1.4)',
    sm: 'var(--line-height-sm, 1.45)',
    md: 'var(--line-height-md, 1.55)',
    lg: 'var(--line-height-lg, 1.6)',
    xl: 'var(--line-height-xl, 1.65)',
  },

  spacing: {
    xxs: 'var(--spacing-xxs, 0.125rem)',
    xs: 'var(--spacing-xs, 0.25rem)',
    sm: 'var(--spacing-sm, 0.5rem)',
    md: 'var(--spacing-md, 1rem)',
    lg: 'var(--spacing-lg, 1.5rem)',
    xl: 'var(--spacing-xl, 2rem)',
  },

  // Single source of truth: src/assets/theme/breakpoints.ts (px → em).
  breakpoints: breakpointsEm,
  components: themeComponents,
});
