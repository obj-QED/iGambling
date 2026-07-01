import { useCallback, useState } from 'react';

import {
  readSidebarDropdownOpenKeys,
  toggleSidebarDropdownOpenKey,
  writeSidebarDropdownOpenKeys,
} from '../lib/sidebarDropdownStorage';

export type SidebarDropdownOpenKeysState = {
  isOpen: (menuKey: string) => boolean;
  toggle: (menuKey: string) => void;
};

export function useSidebarDropdownOpenKeys(
  defaultOpenKeys: readonly string[],
): SidebarDropdownOpenKeysState {
  const [openKeys, setOpenKeys] = useState<ReadonlySet<string>>(() =>
    readSidebarDropdownOpenKeys(defaultOpenKeys),
  );

  const isOpen = useCallback((menuKey: string) => openKeys.has(menuKey), [openKeys]);

  const toggle = useCallback((menuKey: string) => {
    setOpenKeys((current) => {
      const next = toggleSidebarDropdownOpenKey(current, menuKey);
      writeSidebarDropdownOpenKeys(next);
      return next;
    });
  }, []);

  return { isOpen, toggle };
}
