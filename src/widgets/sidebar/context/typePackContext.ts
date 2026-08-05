import type { SidebarTypePack } from '../ui/type/types';

import { createContext } from 'react';

export const SidebarTypePackContext = createContext<SidebarTypePack | null>(null);
