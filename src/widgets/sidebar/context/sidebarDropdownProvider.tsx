import type { SidebarDropdownProviderProps } from '../types';

import { useSidebarDropdownOpenKeys } from '../hooks/useSidebarDropdownOpenKeys';
import { SidebarDropdownContext } from './sidebarDropdownContext';

export type { SidebarDropdownProviderProps } from '../types';

export function SidebarDropdownProvider({
  defaultOpenKeys,
  children,
}: SidebarDropdownProviderProps) {
  const dropdownState = useSidebarDropdownOpenKeys(defaultOpenKeys);

  return (
    <SidebarDropdownContext.Provider value={dropdownState}>
      {children}
    </SidebarDropdownContext.Provider>
  );
}
