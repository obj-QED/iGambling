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
  '--mantine-color-anchor': 'var(--cmf-anchor-color, #2161c8)',
  '--mantine-color-brand-text': 'var(--cmf-brand-text-color, var(--brand-color-6))',
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

  primaryColor: 'brand',
  /* Deeper shade so filled/primary labels stay ≥ AA with white (brand-4/5 fail). */
  primaryShade: { light: 7, dark: 8 },
  colors: { brand },

  fontFamily: 'var(--font-family-base, "IBM Plex Sans", sans-serif)',
  fontSmoothing: true,
  defaultRadius: 'md',

  radius: {
    xs: 'var(--radius-xs)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
  },

  fontSizes: {
    xxs: 'var(--font-size-xxs)',
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    md: 'var(--font-size-md)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
  },

  spacing: {
    xxs: 'var(--spacing-xxs)',
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  },

  // Single source of truth: src/assets/theme/breakpoints.ts (px → em).
  breakpoints: breakpointsEm,
  components: themeComponents,
});
