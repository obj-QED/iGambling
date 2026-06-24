import { ActionIcon, Button, Container, type MantineThemeComponents, Title } from '@mantine/core';
import cx from 'clsx';

import { resolveActionIconRootVars } from './actionIconVars';
import { resolveButtonRootVars } from './buttonVars';

import classes from './components.module.scss';

/**
 * Base app-wide component style config for Mantine.
 * Keep per-component defaults/styles here; mantineTheme.ts stays a thin bridge.
 * Visual rules live in CSS modules and reference design tokens from tokens/theme.scss (SoT).
 *
 * Button cascade (tokens/theme.scss + buttonVars.ts):
 * 1. `--cmf-{scope}-button-{variant}-*` on `[data-cmf-button-scope]`
 * 2. `--cmf-button-{variant}-*` in :root (filled, outline, light, …)
 *
 * ActionIcon cascade (tokens/theme.scss + actionIconVars.ts):
 * 1. `--cmf-{scope}-action-icon-{variant}-*` on `[data-cmf-action-icon-scope]`
 * 2. `--cmf-action-icon-{variant}-*` in :root
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

  Button: Button.extend({
    defaultProps: {
      radius: 'md',
      autoContrast: true,
      variant: 'default',
    },
    classNames: {
      root: classes.button,
    },
    vars: (_, props) => ({
      root: resolveButtonRootVars(props),
    }),
  }),

  ActionIcon: ActionIcon.extend({
    defaultProps: {
      radius: 'md',
      autoContrast: true,
      variant: 'default',
    },
    classNames: {
      root: classes.actionIcon,
    },
    vars: (_, props) => ({
      root: resolveActionIconRootVars(props),
    }),
  }),
};
