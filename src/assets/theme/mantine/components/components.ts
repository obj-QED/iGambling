import { ActionIcon, Button, Container, type MantineThemeComponents, Title } from '@mantine/core';
import cx from 'clsx';

import { resolveActionIconRootVars } from '../vars/actionIconVars';
import { resolveButtonRootVars } from '../vars/buttonVars';

import classes from '../styles/components.module.scss';

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
   * Button — CMF cascade in `vars` (bg/bd/hover/height/padding-x/radius/fz).
   * Size table tokens (`--button-height-sm`, …) remain in Mantine CSS as fallbacks.
   * Gradient hover: `background-image` via `classes.button` (Mantine uses background-color).
   */
  Button: Button.extend({
    classNames: {
      root: classes.button,
      label: classes.buttonLabel,
    },
    vars: (_theme, props) =>
      ({
        root: resolveButtonRootVars(props as Parameters<typeof resolveButtonRootVars>[0]),
      }) as never,
  }),

  /**
   * ActionIcon — same CMF cascade shape as Button (`--ai-*` / `--cmf-action-icon-*`).
   * Gradient hover via `classes.actionIcon`.
   */
  ActionIcon: ActionIcon.extend({
    classNames: {
      root: classes.actionIcon,
    },
    vars: (_theme, props) =>
      ({
        root: resolveActionIconRootVars(props as Parameters<typeof resolveActionIconRootVars>[0]),
      }) as never,
  }),
};
