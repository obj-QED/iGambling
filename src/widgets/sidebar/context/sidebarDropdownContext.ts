import type { SidebarDropdownOpenKeysState } from '../hooks/useSidebarDropdownOpenKeys';

import { createContext } from 'react';

export const SidebarDropdownContext = createContext<SidebarDropdownOpenKeysState | null>(null);
