import { createTheme, type MantineColorScheme } from '@mantine/core';

import { breakpointsEm } from '../breakpoints';
import { BRAND_PALETTE_FALLBACK, createBrandColorsTuple } from './brandPalette';
import { themeComponents } from './components';
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

export const mantineTheme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.3,
  cursorType: 'pointer',

  defaultGradient: {
    from: APP_GRADIENT_FROM,
    to: APP_GRADIENT_TO,
    deg: APP_GRADIENT_DEG,
  },

  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 5 },
  colors: { brand },

  fontFamily: 'var(--font-family-base)',
  defaultRadius: 'md',

  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
  },

  spacing: {
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
