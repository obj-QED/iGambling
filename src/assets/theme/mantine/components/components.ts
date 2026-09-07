import {
  ActionIcon,
  Anchor,
  Button,
  Code,
  Container,
  Drawer,
  Group,
  type MantineThemeComponents,
  Modal,
  Popover,
  Text,
  Title,
} from '@mantine/core';
import cx from 'clsx';

import {
  getDrawerDefaultProps,
  getModalDefaultProps,
  getPopoverDefaultProps,
} from '@/shared/config';

import { MANTINE_ACTION_ICON_VARIANTS } from '../cmf/cmfActionIconVars';
import { MANTINE_BUTTON_VARIANTS } from '../cmf/cmfButtonVars';
import { resolveActionIconRootVars } from '../vars/actionIconVars';
import { resolveButtonCustomVariantPaintVars, resolveButtonRootVars } from '../vars/buttonVars';
import { CLEAR_CODE_INLINE_VARS, resolveCodeRootVars } from '../vars/codeVars';
import { resolveDrawerRootVars } from '../vars/drawerVars';
import { CLEAR_GROUP_INLINE_VARS, resolveGroupRootVars } from '../vars/groupVars';
import { CLEAR_MODAL_INLINE_VARS, resolveModalRootVars } from '../vars/modalVars';
import { CLEAR_POPOVER_INLINE_VARS, resolvePopoverDropdownVars } from '../vars/popoverVars';
import { CLEAR_TEXT_INLINE_VARS, resolveTextRootVars } from '../vars/textVars';

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
 * Clear Mantine default inline CSS vars, then re-apply via `resolve*RootVars` (`nestCssVars`).
 * Order: clear → add. See `cmf/CASCADE.md`.
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

/** Paint-only clear — size stays native Mantine (plain gradient/white bridge). */
const CLEAR_ACTION_ICON_PAINT_INLINE_VARS = {
  '--ai-bg': null,
  '--ai-hover': null,
  '--ai-color': null,
  '--ai-bd': null,
  '--ai-hover-color': null,
} as const;

function pickActionIconPaintVars(root: Record<string, string>): Record<string, string> {
  return {
    '--ai-bg': root['--ai-bg'],
    '--ai-color': root['--ai-color'],
    '--ai-bd': root['--ai-bd'],
    '--ai-bd-color': root['--ai-bd-color'],
    '--ai-bd-width': root['--ai-bd-width'],
    '--ai-hover': root['--ai-hover'],
    '--ai-hover-color': root['--ai-hover-color'],
  };
}

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

/** Native Mantine paint is wrong/weak for these — bridge theme tokens without CMF scope. */
const THEME_PAINT_BRIDGE_VARIANTS = new Set(['gradient', 'white']);

function needsThemePaintBridge(variant: unknown): boolean {
  return typeof variant === 'string' && THEME_PAINT_BRIDGE_VARIANTS.has(variant);
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
   * - `data-cmf-*` → clear Mantine inline → `resolveButtonRootVars` (nestCssVars)
   * - custom `variant` (`hero`, `button-link`, …) → clear paints + paint-only token bridge
   * - `gradient` / `white` (no CMF) → theme paint bridge (Mantine hover≈bg / wrong white colors)
   * - other plain Mantine variants → keep native paints
   */
  Button: Button.extend({
    classNames: {
      root: classes.button,
      inner: classes.buttonInner,
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
        return {
          root: {
            ...CLEAR_BUTTON_INLINE_VARS,
            ...resolveButtonRootVars(record),
          },
        } as never;
      }

      // Native Mantine `gradient` sets hover===bg; `white` uses black text — bridge theme paints.
      if (needsThemePaintBridge(props.variant)) {
        return {
          root: {
            ...CLEAR_BUTTON_PAINT_INLINE_VARS,
            ...resolveButtonCustomVariantPaintVars(record),
          },
        } as never;
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
        return {
          root: {
            ...CLEAR_ACTION_ICON_INLINE_VARS,
            ...resolveActionIconRootVars(record),
          },
        } as never;
      }

      if (needsThemePaintBridge(props.variant)) {
        return {
          root: {
            ...CLEAR_ACTION_ICON_PAINT_INLINE_VARS,
            ...pickActionIconPaintVars(resolveActionIconRootVars(record)),
          },
        } as never;
      }

      return { root: {} } as never;
    },
  }),

  /**
   * Group — layout row with CMF cascade when `data-cmf-*` is set:
   * key → component → `--cmf-group-{gap|align|justify|wrap}` → Mantine defaults.
   */
  Group: Group.extend({
    vars: (_theme, props) => {
      const record = props as Record<string, unknown>;
      if (!hasCmfScope(record)) {
        return { root: {} } as never;
      }
      return {
        root: {
          ...CLEAR_GROUP_INLINE_VARS,
          ...resolveGroupRootVars(record),
        },
      } as never;
    },
  }),

  /**
   * Modal — always theme paint bridge (default `:root --cmf-modal-*`).
   * With `data-cmf-*`: key → component → shared → fallback.
   * Parts: content | header | title | close | body | overlay.
   * Behavior defaults: `params.modal` (`getModalDefaultProps`).
   */
  Modal: Modal.extend({
    defaultProps: getModalDefaultProps(),
    classNames: {
      content: classes.modalContent,
      header: classes.modalHeader,
      title: classes.modalTitle,
      close: classes.modalClose,
      body: classes.modalBody,
      overlay: classes.modalOverlay,
    },
    vars: (_theme, props) => {
      const record = props as unknown as Record<string, unknown>;
      return {
        root: {
          ...CLEAR_MODAL_INLINE_VARS,
          ...resolveModalRootVars(record),
        },
      } as never;
    },
  }),

  /**
   * Drawer — always theme paint bridge (default `:root --drawer-*`).
   * With `data-cmf-*`: key → component → `--drawer-*` (portal SoT).
   * Parts: content | header | title | close | body | overlay.
   * Behavior defaults: `params.drawer` (`getDrawerDefaultProps`).
   * AppDrawer compound also applies vars + classNames in JS.
   */
  Drawer: Drawer.extend({
    defaultProps: getDrawerDefaultProps(),
    classNames: {
      content: classes.drawerContent,
      header: classes.drawerHeader,
      title: classes.drawerTitle,
      close: classes.drawerClose,
      body: classes.drawerBody,
      overlay: classes.drawerOverlay,
    },
    vars: (_theme, props) => {
      const record = props as unknown as Record<string, unknown>;
      return {
        root: {
          ...resolveDrawerRootVars(record),
        },
      } as never;
    },
  }),

  /**
   * Popover — always theme paint bridge (default `:root --popover-*`).
   * With `data-cmf-*`: key → component → `--popover-*`.
   * Parts: dropdown | arrow | overlay. Behavior: `params.popover`.
   * DeepPanel may override paint via widget-layer classNames (wins over mantine-rebase).
   */
  Popover: Popover.extend({
    defaultProps: getPopoverDefaultProps(),
    classNames: {
      dropdown: classes.popoverDropdown,
      arrow: classes.popoverArrow,
      overlay: classes.popoverOverlay,
    },
    vars: (_theme, props) => {
      const record = props as unknown as Record<string, unknown>;
      return {
        dropdown: {
          ...CLEAR_POPOVER_INLINE_VARS,
          ...resolvePopoverDropdownVars(record),
        },
      } as never;
    },
  }),

  /**
   * Text — always theme bridge (fz / lh / color).
   * With `data-cmf-*`: key → component → default|dimmed|bright → parent → fallback.
   * Without: `--cmf-text-default-*` → size / `--color-text`.
   * Anchor is Text-based — skip body `--text-color` (link paint via `.anchor`).
   */
  Text: Text.extend({
    classNames: {
      root: classes.text,
    },
    vars: (_theme, props) => {
      const record = props as unknown as Record<string, unknown>;
      const root = {
        ...CLEAR_TEXT_INLINE_VARS,
        ...resolveTextRootVars(record),
      };
      // Mantine Anchor extends Text and passes `underline` — don't stamp body text color.
      if (record.underline !== undefined) {
        Reflect.deleteProperty(root, '--text-color');
      }
      return { root } as never;
    },
  }),

  /**
   * Code — CMF when `data-cmf-*`:
   * key → component → `--cmf-code-default-*` → parent → Mantine defaults.
   * Plain Code stays native.
   */
  Code: Code.extend({
    classNames: (_theme, props) => {
      if (!hasCmfScope(props as unknown as Record<string, unknown>)) {
        return {};
      }
      return { root: classes.code };
    },
    vars: (_theme, props) => {
      const record = props as unknown as Record<string, unknown>;
      if (!hasCmfScope(record)) {
        return { root: {} } as never;
      }
      return {
        root: {
          ...CLEAR_CODE_INLINE_VARS,
          ...resolveCodeRootVars(record),
        },
      } as never;
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
