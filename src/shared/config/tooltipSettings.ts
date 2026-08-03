import type { TooltipProps } from '@mantine/core';

/** Floating positions accepted by Mantine Tooltip. */
export const TOOLTIP_POSITIONS = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
] as const;

export type TooltipPosition = (typeof TOOLTIP_POSITIONS)[number];

/**
 * Mantine Tooltip props allowed from settings (excludes render/slot chrome).
 * Any key present on `TooltipProps` (e.g. `multiline`) can be set in settings.
 */
export type TooltipMantineSettings = Partial<
  Omit<
    TooltipProps,
    | 'children'
    | 'label'
    | 'className'
    | 'classNames'
    | 'style'
    | 'styles'
    | 'vars'
    | 'mod'
    | 'variant'
  >
>;

/**
 * Raw tooltip tunables from settings (widget / place).
 * Cascade: pack defaults → widget (`aside.tooltip` / `header.tooltip`) → place override.
 * `delay` is a settings alias for Mantine `openDelay`.
 */
export type TooltipSettings = TooltipMantineSettings & {
  enabled?: boolean;
  /** Open delay (ms) → Mantine `openDelay`. */
  delay?: number;
};

/** Fully resolved tooltip config for UI. */
export type TooltipConfig = TooltipMantineSettings & {
  enabled: boolean;
  position: TooltipPosition;
  delay: number;
  /** Close delay (ms) — needed to move into / select interactive tooltip text. */
  closeDelay: number;
  withArrow: boolean;
  offset: number;
};

export const DEFAULT_TOOLTIP_CONFIG: TooltipConfig = {
  enabled: false,
  position: 'top',
  delay: 0,
  /**
   * Keep open long enough to move into the floating label (needs
   * `pointer-events: auto` on AppTooltip `.tooltip`) and select HTML copy.
   */
  closeDelay: 300,
  withArrow: true,
  offset: 5,
};
