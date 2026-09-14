import { useCallback, useSyncExternalStore } from 'react';

import { useRequiredContext } from '@/shared/hooks';

import { SidebarDropdownContext } from './context';

export function useSidebarDropdown(menuKey: string): {
  opened: boolean;
  toggle: () => void;
} {
  const store = useRequiredContext(
    SidebarDropdownContext,
    'useSidebarDropdown must be used within SidebarDropdownProvider',
  );

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      let prev = store.getOpenKeys().has(menuKey);
      return store.subscribe(() => {
        const next = store.getOpenKeys().has(menuKey);
        if (next === prev) return;
        prev = next;
        onStoreChange();
      });
    },
    [store, menuKey],
  );

  const getSnapshot = useCallback(() => store.getOpenKeys().has(menuKey), [store, menuKey]);

  const opened = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const toggle = useCallback(() => {
    store.toggle(menuKey);
  }, [store, menuKey]);

  return { opened, toggle };
}
