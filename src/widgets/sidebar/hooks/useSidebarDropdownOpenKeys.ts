import { useCallback, useMemo, useRef } from 'react';

import { createSidebarDropdownOpenKeysStore, type SidebarDropdownOpenKeysStore } from '../lib';

export type { SidebarDropdownOpenKeysStore };

/**
 * Stable dropdown open-keys store for the provider.
 * Per-item open state: `useSidebarDropdown(menuKey)` + `useSyncExternalStore`.
 */
export function useSidebarDropdownOpenKeysStore(
  defaultOpenKeys: readonly string[],
): SidebarDropdownOpenKeysStore {
  const defaultsRef = useRef(defaultOpenKeys);
  return useMemo(() => createSidebarDropdownOpenKeysStore(defaultsRef.current), []);
}

/** @deprecated Prefer `useSidebarDropdown(menuKey)`. */
export type SidebarDropdownOpenKeysState = {
  isOpen: (menuKey: string) => boolean;
  toggle: (menuKey: string) => void;
};

/** @deprecated Use `useSidebarDropdownOpenKeysStore` + `useSidebarDropdown(menuKey)`. */
export function useSidebarDropdownOpenKeys(
  defaultOpenKeys: readonly string[],
): SidebarDropdownOpenKeysState {
  const store = useSidebarDropdownOpenKeysStore(defaultOpenKeys);
  const isOpen = useCallback((menuKey: string) => store.getOpenKeys().has(menuKey), [store]);
  const toggle = useCallback(
    (menuKey: string) => {
      store.toggle(menuKey);
    },
    [store],
  );
  return useMemo(() => ({ isOpen, toggle }), [isOpen, toggle]);
}
