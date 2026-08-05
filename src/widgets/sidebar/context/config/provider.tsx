import type { SidebarConfigProviderProps } from '../../types';

import { SidebarConfigContext } from './context';

export type { SidebarConfigProviderProps } from '../../types';

export function SidebarConfigProvider({ config, children }: SidebarConfigProviderProps) {
  return <SidebarConfigContext.Provider value={config}>{children}</SidebarConfigContext.Provider>;
}
