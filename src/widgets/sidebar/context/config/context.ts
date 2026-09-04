import type { SidebarSchema } from '../../types';

import { createContext } from 'react';

export const SidebarConfigContext = createContext<SidebarSchema | null>(null);
