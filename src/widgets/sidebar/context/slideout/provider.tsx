import type { ReactNode } from 'react';

import { useCallback, useMemo, useState } from 'react';

import { useIsMobile } from '@hooks/useIsMobile';

import {
  readSidebarSlideoutExpanded,
  resolveSidebarSlideoutPhase,
  SIDEBAR_SLIDEOUT_EXPANDED_DEFAULT,
  writeSidebarSlideoutExpanded,
} from '../../lib/slideout';
import { type SidebarSlideoutApi, SidebarSlideoutContext } from './context';

export type SidebarSlideoutProviderProps = {
  /** `aside.type === 'slideout'`. */
  enabled: boolean;
  children: ReactNode;
};

/**
 * Slideout open/closed — desktop only (`> tablet` / 1024).
 * Persists in localStorage; default open. Below tablet: always expanded (no rail).
 *
 * Phases: `expanded` | `collapsed` | `expanding` | `collapsing`
 * (`data-aside-slideout-phase` on the aside).
 */
export function SidebarSlideoutProvider({ enabled, children }: SidebarSlideoutProviderProps) {
  const isMobile = useIsMobile();
  /** Collapse/expand only above tablet breakpoint. */
  const viewportActive = enabled && !isMobile;

  const [expanded, setExpandedState] = useState(() =>
    readSidebarSlideoutExpanded(SIDEBAR_SLIDEOUT_EXPANDED_DEFAULT),
  );
  /** Idle on mount — phase is expanded|collapsed, not mid-transition. */
  const [settled, setSettled] = useState(true);

  const setExpanded = useCallback(
    (next: boolean) => {
      if (!viewportActive) return;
      setSettled(false);
      setExpandedState(next);
      writeSidebarSlideoutExpanded(next);
    },
    [viewportActive],
  );

  const toggle = useCallback(() => {
    if (!viewportActive) return;
    setExpandedState((prev) => {
      const next = !prev;
      setSettled(false);
      writeSidebarSlideoutExpanded(next);
      return next;
    });
  }, [viewportActive]);

  const markSettled = useCallback(() => {
    if (!viewportActive) return;
    setSettled(true);
  }, [viewportActive]);

  const value = useMemo<SidebarSlideoutApi>(() => {
    const open = enabled ? (viewportActive ? expanded : true) : false;
    const idle = viewportActive ? settled : true;
    return {
      enabled: viewportActive,
      expanded: open,
      settled: idle,
      phase: resolveSidebarSlideoutPhase(open, idle),
      toggle,
      setExpanded,
      markSettled,
    };
  }, [enabled, viewportActive, expanded, settled, toggle, setExpanded, markSettled]);

  return (
    <SidebarSlideoutContext.Provider value={value}>{children}</SidebarSlideoutContext.Provider>
  );
}
