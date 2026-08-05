import type { SidebarConfig } from '../../types';

import { createContext } from 'react';

export const SidebarConfigContext = createContext<SidebarConfig | null>(null);
