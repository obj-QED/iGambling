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
 * Raw tooltip tunables from settings (widget / place).
 * Cascade: pack defaults → widget (`aside.tooltip`) → place override.
 */
export type TooltipSettings = {
  enabled?: boolean;
  position?: TooltipPosition;
  /** Open delay (ms) → Mantine `openDelay`. */
  delay?: number;
  withArrow?: boolean;
  offset?: number;
};

/** Fully resolved tooltip config for UI. */
export type TooltipConfig = {
  enabled: boolean;
  position: TooltipPosition;
  delay: number;
  withArrow: boolean;
  offset: number;
};

export const DEFAULT_TOOLTIP_CONFIG: TooltipConfig = {
  enabled: false,
  position: 'top',
  delay: 0,
  withArrow: true,
  offset: 5,
};
