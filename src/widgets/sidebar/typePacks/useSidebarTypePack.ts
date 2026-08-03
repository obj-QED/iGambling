import type { SidebarTypePack } from './types';

import { useContext } from 'react';

import { SidebarTypePackContext } from '../context/typePackContext';

export function useSidebarTypePack(): SidebarTypePack {
  const pack = useContext(SidebarTypePackContext);
  if (!pack) {
    throw new Error('useSidebarTypePack must be used within SidebarTypePackProvider');
  }
  return pack;
}
