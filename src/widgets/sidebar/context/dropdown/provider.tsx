import type { SidebarDropdownProviderProps } from '../../types';

import { useSidebarDropdownOpenKeysStore } from '../../hooks/useSidebarDropdownOpenKeys';
import { SidebarDropdownContext } from './context';

export type { SidebarDropdownProviderProps } from '../../types';

export function SidebarDropdownProvider({
  defaultOpenKeys,
  children,
}: SidebarDropdownProviderProps) {
  const store = useSidebarDropdownOpenKeysStore(defaultOpenKeys);

  return (
    <SidebarDropdownContext.Provider value={store}>{children}</SidebarDropdownContext.Provider>
  );
}
