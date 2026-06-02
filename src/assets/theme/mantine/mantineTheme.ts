import { createTheme, type MantineColorScheme, type MantineColorsTuple } from '@mantine/core';

import { breakpointsEm } from '../breakpoints';
import { themeComponents } from './components';

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
// (e.g. `ctc-Button-root`) used for targeting/debug — not the bundled
// styles, which are applied via hashed `.m_*` classes.
export const classNamesPrefix: string = 'ctc';

const brand: MantineColorsTuple = [
  '#f2efff',
  '#ddd6ff',
  '#b9abff',
  '#937dff',
  '#7355ff',
  '#5f3dff',
  '#5630ff',
  '#4524e6',
  '#3c1fcd',
  '#3119b4',
];

export const mantineTheme = createTheme({
  autoContrast: true,
  primaryColor: 'brand',
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
