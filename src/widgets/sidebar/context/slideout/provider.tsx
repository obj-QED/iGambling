import type { ReactNode } from 'react';

import { useCallback, useMemo, useState } from 'react';

import { type SidebarSlideoutApi, SidebarSlideoutContext } from './context';

export type SidebarSlideoutProviderProps = {
  enabled: boolean;
  children: ReactNode;
};

export function SidebarSlideoutProvider({ enabled, children }: SidebarSlideoutProviderProps) {
  const [expanded, setExpandedState] = useState(false);
  /** Collapsed start → rail chrome already settled. */
  const [settled, setSettled] = useState(true);

  const setExpanded = useCallback(
    (next: boolean) => {
      if (!enabled) return;
      if (next) {
        setSettled(false);
      } else {
        // Compressing — wait for width transitionend before rail chrome.
        setSettled(false);
      }
      setExpandedState(next);
    },
    [enabled],
  );

  const toggle = useCallback(() => {
    if (!enabled) return;
    setExpandedState((prev) => {
      const next = !prev;
      setSettled(false);
      return next;
    });
  }, [enabled]);

  const markSettled = useCallback(() => {
    if (!enabled) return;
    setSettled(true);
  }, [enabled]);

  const value = useMemo<SidebarSlideoutApi>(
    () => ({
      enabled,
      expanded: enabled ? expanded : false,
      /** Rail chrome only while collapsed and width transition finished. */
      settled: enabled && !expanded && settled,
      toggle,
      setExpanded,
      markSettled,
    }),
    [enabled, expanded, settled, toggle, setExpanded, markSettled],
  );

  return (
    <SidebarSlideoutContext.Provider value={value}>{children}</SidebarSlideoutContext.Provider>
  );
}
