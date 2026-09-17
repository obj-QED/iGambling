import type { ReactNode } from 'react';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useIsMobile } from '@hooks/useIsMobile';

import {
  readSidebarSlideoutExpanded,
  resolveSidebarSlideoutPhase,
  SIDEBAR_SLIDEOUT_EXPANDED_DEFAULT,
  type SidebarExpandPersistMode,
  writeSidebarSlideoutExpanded,
} from '../../lib/slideout';
import { type SidebarSlideoutApi, SidebarSlideoutContext } from './context';

/** Matches `--aside-slideout-transition` / `--aside-slidein-transition` — fallback if `transitionend` is missed. */
const SLIDEOUT_SETTLE_FALLBACK_MS = 500;

export type SidebarSlideoutProviderProps = {
  /** `aside.type` is an expand shell (`slideout` | `slidein`). */
  enabled: boolean;
  /** localStorage key namespace — default `slideout`. */
  persistMode?: SidebarExpandPersistMode;
  children: ReactNode;
};

/**
 * Expand/collapse open/closed — desktop only (`> tablet`).
 * Used by `slideout` and `slidein`. Persists in localStorage; default open.
 * Below tablet: always expanded (no rail).
 *
 * Phases: `expanded` | `collapsed` | `expanding` | `collapsing`
 * (data attrs on the aside: `data-aside-slideout-*` or `data-aside-slidein-*`).
 */
export function SidebarSlideoutProvider({
  enabled,
  persistMode = 'slideout',
  children,
}: SidebarSlideoutProviderProps) {
  const isMobile = useIsMobile();
  /** Collapse/expand only above tablet breakpoint. */
  const viewportActive = enabled && !isMobile;

  const [expanded, setExpandedState] = useState(() =>
    readSidebarSlideoutExpanded(SIDEBAR_SLIDEOUT_EXPANDED_DEFAULT, persistMode),
  );
  /** Idle on mount — phase is expanded|collapsed, not mid-transition. */
  const [settled, setSettled] = useState(true);
  const settleFallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSettleFallback = useCallback(() => {
    if (settleFallbackRef.current !== null) {
      clearTimeout(settleFallbackRef.current);
      settleFallbackRef.current = null;
    }
  }, []);

  const markSettled = useCallback(() => {
    if (!viewportActive) return;
    clearSettleFallback();
    setSettled(true);
  }, [viewportActive, clearSettleFallback]);

  const armSettleFallback = useCallback(() => {
    clearSettleFallback();
    settleFallbackRef.current = setTimeout(() => {
      settleFallbackRef.current = null;
      setSettled(true);
    }, SLIDEOUT_SETTLE_FALLBACK_MS);
  }, [clearSettleFallback]);

  const setExpanded = useCallback(
    (next: boolean) => {
      if (!viewportActive) return;
      setSettled(false);
      armSettleFallback();
      setExpandedState(next);
      writeSidebarSlideoutExpanded(next, persistMode);
    },
    [viewportActive, armSettleFallback, persistMode],
  );

  const toggle = useCallback(() => {
    if (!viewportActive) return;
    setExpandedState((prev) => {
      const next = !prev;
      setSettled(false);
      armSettleFallback();
      writeSidebarSlideoutExpanded(next, persistMode);
      return next;
    });
  }, [viewportActive, armSettleFallback, persistMode]);

  useEffect(
    () => () => {
      clearSettleFallback();
    },
    [clearSettleFallback],
  );

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
