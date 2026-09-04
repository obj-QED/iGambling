import type { SidebarSchema } from '../../types';

import { useContext } from 'react';

import { SidebarConfigContext } from './context';

export function useSidebarConfig(): SidebarSchema {
  const config = useContext(SidebarConfigContext);
  if (config === null) {
    throw new Error('useSidebarConfig must be used within SidebarConfigProvider');
  }
  return config;
}
