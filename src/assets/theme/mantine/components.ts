import { Container, type MantineThemeComponents, Title } from '@mantine/core';
import cx from 'clsx';

import classes from './components.module.scss';

/**
 * Base app-wide component style config for Mantine.
 * Keep per-component defaults/styles here; mantineTheme.ts stays a thin bridge.
 * Visual rules live in CSS modules and reference design tokens from tokens/theme.scss (SoT).
 */
export const themeComponents: MantineThemeComponents = {
  // Heading visuals (color, per-order tweaks) live in components.module.scss.
  Title: Title.extend({
    classNames: { root: classes.heading },
  }),

  // size="responsive": token-driven max-width per breakpoint (components.module.scss).
  Container: Container.extend({
    classNames: (_, { size }) => ({
      root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
    }),
  }),
};
