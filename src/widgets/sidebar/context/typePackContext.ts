import type { SidebarTypePack } from '../typePacks/types';

import { createContext } from 'react';

export const SidebarTypePackContext = createContext<SidebarTypePack | null>(null);
