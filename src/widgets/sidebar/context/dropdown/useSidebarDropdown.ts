import type { SidebarDropdownOpenKeysState } from '../../hooks/useSidebarDropdownOpenKeys';

import { useContext } from 'react';

import { SidebarDropdownContext } from './context';

export function useSidebarDropdown(): SidebarDropdownOpenKeysState {
  const value = useContext(SidebarDropdownContext);

  if (value === null) {
    throw new Error('useSidebarDropdown must be used within SidebarDropdownProvider');
  }

  return value;
}
