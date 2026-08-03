import { ActionIcon, Button, Container, type MantineThemeComponents, Title } from '@mantine/core';
import cx from 'clsx';

import classes from '../styles/components.module.scss';

/**
 * Clear Mantine default inline CSS vars — CMF cascade is applied in
 * `styles/_cmf-control-cascade.scss` via `data-variant` / `data-size` / `data-cmf-*`.
 */
const CLEAR_BUTTON_INLINE_VARS = {
  '--button-justify': null,
  '--button-height': null,
  '--button-padding-x': null,
  '--button-fz': null,
  '--button-radius': null,
  '--button-bg': null,
  '--button-hover': null,
  '--button-color': null,
  '--button-bd': null,
  '--button-hover-color': null,
} as const;

const CLEAR_ACTION_ICON_INLINE_VARS = {
  '--ai-size': null,
  '--ai-radius': null,
  '--ai-bg': null,
  '--ai-hover': null,
  '--ai-color': null,
  '--ai-bd': null,
  '--ai-hover-color': null,
} as const;

export const themeComponents: MantineThemeComponents = {
  Title: Title.extend({
    classNames: { root: classes.heading },
    vars: () =>
      ({
        root: {
          '--title-fw': null,
          '--title-lh': null,
          '--title-fz': null,
        },
      }) as never,
  }),

  /** Container — layout only, no CMF layers. */
  Container: Container.extend({
    classNames: (_, { size }) => ({
      root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
    }),
  }),

  /**
   * Button — CMF cascade in CSS (`_cmf-control-cascade.scss`).
   * Size table tokens (`--button-height-sm`, …) remain in Mantine CSS as fallbacks.
   * Gradient hover: `background-image` via `classes.button`.
   */
  Button: Button.extend({
    classNames: {
      root: classes.button,
      label: classes.buttonLabel,
    },
    vars: () =>
      ({
        root: CLEAR_BUTTON_INLINE_VARS,
      }) as never,
  }),

  /**
   * ActionIcon — same CMF cascade in CSS as Button (`--ai-*` / `--cmf-action-icon-*`).
   * Gradient hover via `classes.actionIcon`.
   */
  ActionIcon: ActionIcon.extend({
    classNames: {
      root: classes.actionIcon,
    },
    vars: () =>
      ({
        root: CLEAR_ACTION_ICON_INLINE_VARS,
      }) as never,
  }),
};
