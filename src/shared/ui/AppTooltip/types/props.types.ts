import type { TooltipConfig } from '@/shared/config/tooltipSettings';
import type { ReactElement, ReactNode } from 'react';

export type AppTooltipProps = {
  /**
   * Primary tooltip copy. When empty, falls back to `name`
   * (`item.label` → `item.name` for menu rows).
   * String values may include HTML (rendered via AppTooltip).
   */
  label?: ReactNode;
  /** Fallback when `label` is missing/empty (menu `name`). May include HTML. */
  name?: string;
  children: ReactElement;
  /** Resolved widget/place config (enabled / position / delay / …). */
  config: TooltipConfig;
  /** Optional place-level override merged on top of `config`. */
  override?: Partial<TooltipConfig>;
  /** CMF scope for style cascade on the floating tooltip. */
  cmfComponent?: string;
  cmfKey?: string;
  className?: string;
};
