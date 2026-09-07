import { createContext } from 'react';

export type SidebarSlideoutApi = {
  /** True when `aside.type === 'slideout'`. */
  enabled: boolean;
  expanded: boolean;
  /**
   * True after collapse `width` transition finishes.
   * Cleared immediately on expand so rail chrome (center logo, chevron column, initial) undoes first.
   */
  settled: boolean;
  toggle: () => void;
  setExpanded: (next: boolean) => void;
  /** Call from aside `transitionend` (width) when collapsed. */
  markSettled: () => void;
};

export const SIDEBAR_SLIDEOUT_IDLE: SidebarSlideoutApi = {
  enabled: false,
  expanded: false,
  settled: false,
  toggle: () => {},
  setExpanded: () => {},
  markSettled: () => {},
};

export const SidebarSlideoutContext = createContext<SidebarSlideoutApi>(SIDEBAR_SLIDEOUT_IDLE);
