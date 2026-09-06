import {
  readSidebarDropdownOpenKeys,
  toggleSidebarDropdownOpenKey,
  writeSidebarDropdownOpenKeys,
} from './sidebarDropdownStorage';

export type SidebarDropdownOpenKeysStore = {
  subscribe: (listener: () => void) => () => void;
  getOpenKeys: () => ReadonlySet<string>;
  toggle: (menuKey: string) => void;
};

/** Mutable open-keys store — consumers subscribe per key via `useSyncExternalStore`. */
export function createSidebarDropdownOpenKeysStore(
  defaultOpenKeys: readonly string[],
): SidebarDropdownOpenKeysStore {
  let openKeys: ReadonlySet<string> = readSidebarDropdownOpenKeys(defaultOpenKeys);
  const listeners = new Set<() => void>();

  const emit = (): void => {
    listeners.forEach((listener) => {
      listener();
    });
  };

  return {
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getOpenKeys: () => openKeys,
    toggle: (menuKey) => {
      openKeys = toggleSidebarDropdownOpenKey(openKeys, menuKey);
      writeSidebarDropdownOpenKeys(openKeys);
      emit();
    },
  };
}
