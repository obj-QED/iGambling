import {
  ActionIcon,
  Button,
  Code,
  Collapse,
  Container,
  Group,
  type MantineThemeComponents,
  Menu,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import cx from 'clsx';

import { resolveActionIconRootVars } from '../vars/actionIconVars';
import { resolveButtonRootVars } from '../vars/buttonVars';
import { resolveTextInputRootVars } from '../vars/textInputVars';
import { resolveTitleRootVars } from '../vars/titleVars';

import classes from '../styles/components.module.scss';

/**
 * Mantine CMF cascade — all themed components except Container.
 *
 * Layers (high → low): cmf-component-key-{ctrl} → cmf-component-{ctrl} → cmf-{ctrl} → Mantine
 * Scope: `data-cmf-component` + optional `data-menu-key` on control root.
 */
export const themeComponents: MantineThemeComponents = {
  Title: Title.extend({
    classNames: { root: classes.heading },
    vars: (theme, props) => ({
      root: resolveTitleRootVars(theme, props as Record<string, unknown>),
    }),
  }),

  /** Container — layout only, no CMF layers. */
  Container: Container.extend({
    classNames: (_, { size }) => ({
      root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
    }),
  }),

  Button: Button.extend({
    defaultProps: { autoContrast: true, variant: 'default' },
    classNames: { root: classes.button },
    vars: (theme, props) => ({ root: resolveButtonRootVars(theme, props) }),
  }),

  ActionIcon: ActionIcon.extend({
    defaultProps: { autoContrast: true, variant: 'default' },
    classNames: { root: classes.actionIcon },
    vars: (theme, props) => ({ root: resolveActionIconRootVars(theme, props) }),
  }),

  TextInput: TextInput.extend({
    vars: (theme, props) => ({
      wrapper: resolveTextInputRootVars(theme, props as Record<string, unknown>),
    }),
  }),

  Menu: Menu.extend({
    classNames: {
      dropdown: classes.menuDropdown,
      item: classes.menuItem,
      itemLabel: classes.menuItemLabel,
    },
  }),

  Text: Text.extend({}),

  Group: Group.extend({}),

  Stack: Stack.extend({}),

  Collapse: Collapse.extend({}),

  Code: Code.extend({}),

  Switch: Switch.extend({}),

  SegmentedControl: SegmentedControl.extend({}),

  UnstyledButton: UnstyledButton.extend({}),
};
