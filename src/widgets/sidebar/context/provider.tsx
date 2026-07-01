import type { SidebarConfig } from '../types';
import type { ReactNode } from 'react';

import { SidebarConfigContext } from './context';

export type SidebarConfigProviderProps = {
  config: SidebarConfig;
  children: ReactNode;
};

export function SidebarConfigProvider({ config, children }: SidebarConfigProviderProps) {
  return <SidebarConfigContext.Provider value={config}>{children}</SidebarConfigContext.Provider>;
}
