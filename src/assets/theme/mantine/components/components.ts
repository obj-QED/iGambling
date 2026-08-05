import {
  ActionIcon,
  Anchor,
  Button,
  Container,
  type MantineThemeComponents,
  Title,
} from '@mantine/core';
import cx from 'clsx';

import { MANTINE_ACTION_ICON_VARIANTS } from '../cmf/cmfActionIconVars';
import { MANTINE_BUTTON_VARIANTS } from '../cmf/cmfButtonVars';
import { resolveActionIconRootVars } from '../vars/actionIconVars';
import { resolveButtonCustomVariantPaintVars } from '../vars/buttonVars';

import classes from '../styles/components.module.scss';

/**
 * Clear Mantine paint inline vars only — size stays native.
 * Custom variants (`hero`, `button-link`) also bridge `--button-radius` (Mantine omits it when
 * `radius` prop is unset).
 */
const CLEAR_BUTTON_PAINT_INLINE_VARS = {
  '--button-bg': null,
  '--button-hover': null,
  '--button-color': null,
  '--button-bd': null,
  '--button-hover-color': null,
} as const;

/**
 * Clear Mantine default inline CSS vars — widget `data-cmf-*` uses CSS cascade
 * (`_cmf-control-cascade.scss`). Custom `data-variant` paints wire via `vars()` → tokens.
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

function hasCmfScope(props: Record<string, unknown>): boolean {
  return (
    typeof props['data-cmf-component'] === 'string' || typeof props['data-cmf-key'] === 'string'
  );
}

function isCustomButtonVariant(variant: unknown): variant is string {
  return (
    typeof variant === 'string' &&
    variant.trim().length > 0 &&
    (MANTINE_BUTTON_VARIANTS as readonly string[]).includes(variant) === false
  );
}

function isCustomActionIconVariant(variant: unknown): variant is string {
  return (
    typeof variant === 'string' &&
    variant.trim().length > 0 &&
    (MANTINE_ACTION_ICON_VARIANTS as readonly string[]).includes(variant) === false
  );
}

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
   * Button:
   * - `data-cmf-*` → clear Mantine paints; CSS cascade owns known variants / keys
   * - custom `variant` (`hero`, `button-link`, …) → clear paints + paint-only token bridge
   * - plain Mantine variants → keep native `color` / variant paints
   */
  Button: Button.extend({
    classNames: {
      root: classes.button,
      label: classes.buttonLabel,
    },
    vars: (_theme, props) => {
      const record = props as Record<string, unknown>;

      if (isCustomButtonVariant(props.variant)) {
        return {
          root: {
            ...CLEAR_BUTTON_PAINT_INLINE_VARS,
            ...resolveButtonCustomVariantPaintVars(record),
          },
        } as never;
      }

      if (hasCmfScope(record)) {
        return { root: CLEAR_BUTTON_INLINE_VARS } as never;
      }

      return { root: {} } as never;
    },
  }),

  /** ActionIcon — same gates as Button. */
  ActionIcon: ActionIcon.extend({
    classNames: {
      root: classes.actionIcon,
    },
    vars: (_theme, props) => {
      const record = props as Record<string, unknown>;

      if (isCustomActionIconVariant(props.variant)) {
        return {
          root: {
            ...CLEAR_ACTION_ICON_INLINE_VARS,
            ...resolveActionIconRootVars(record),
          },
        } as never;
      }

      if (hasCmfScope(record)) {
        return { root: CLEAR_ACTION_ICON_INLINE_VARS } as never;
      }

      return { root: {} } as never;
    },
  }),

  /**
   * Anchor — token cascade like Button `hero`:
   * - color via `--mantine-color-anchor` ← `--cmf-anchor` (cssVariablesResolver)
   * - underline via `--root-anchor-underline` (CSS; Mantine enum can't hold `var(...)`)
   */
  Anchor: Anchor.extend({
    classNames: { root: classes.anchor },
    defaultProps: {
      underline: 'never',
    },
    styles: (_theme, props) => {
      // Default / `never`: decoration owned by theme token. Other modes keep Mantine CSS.
      if (props.underline !== undefined && props.underline !== 'never') {
        return {};
      }
      return {
        root: {
          textDecoration: 'var(--root-anchor-underline, none)',
        },
      };
    },
  }),
};
