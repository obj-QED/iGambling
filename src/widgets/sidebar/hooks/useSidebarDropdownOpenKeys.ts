import { useCallback, useMemo, useState } from 'react';

import { createSidebarDropdownOpenKeysStore, type SidebarDropdownOpenKeysStore } from '../lib';

export type { SidebarDropdownOpenKeysStore };

/**
 * Stable dropdown open-keys store for the provider.
 * Per-item open state: `useSidebarDropdown(menuKey)` + `useSyncExternalStore`.
 * Defaults are read once on mount (first-visit open keys).
 */
export function useSidebarDropdownOpenKeysStore(
  defaultOpenKeys: readonly string[],
): SidebarDropdownOpenKeysStore {
  const [store] = useState(() => createSidebarDropdownOpenKeysStore(defaultOpenKeys));
  return store;
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
