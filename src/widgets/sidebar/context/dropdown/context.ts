import type { SidebarDropdownOpenKeysStore } from '../../hooks/useSidebarDropdownOpenKeys';

import { createContext } from 'react';

export const SidebarDropdownContext = createContext<SidebarDropdownOpenKeysStore | null>(null);
