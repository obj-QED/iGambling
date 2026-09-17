import type { SidebarSlideoutPhase } from '../../lib/slideout';

import { createContext } from 'react';

export type SidebarSlideoutApi = {
  /**
   * True when `aside.type` is an expand shell (`slideout` | `slidein`) and viewport is above tablet.
   * Below tablet: false — no toggle / rail chrome (always expanded look).
   */
  enabled: boolean;
  expanded: boolean;
  /**
   * True when width transition is idle (mount, or after `transitionend`).
   * Cleared on toggle until the next width `transitionend`.
   */
  settled: boolean;
  /** `expanded` | `collapsed` | `expanding` | `collapsing` — CSS SoT on the aside. */
  phase: SidebarSlideoutPhase;
  toggle: () => void;
  setExpanded: (next: boolean) => void;
  /** Call from aside `transitionend` (width) — both expand and collapse. */
  markSettled: () => void;
};

export const SIDEBAR_SLIDEOUT_IDLE: SidebarSlideoutApi = {
  enabled: false,
  expanded: false,
  settled: false,
  phase: 'expanded',
  toggle: () => {},
  setExpanded: () => {},
  markSettled: () => {},
};

export const SidebarSlideoutContext = createContext<SidebarSlideoutApi>(SIDEBAR_SLIDEOUT_IDLE);
