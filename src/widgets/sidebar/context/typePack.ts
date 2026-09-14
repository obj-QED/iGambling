import type { SidebarTypePack } from '../ui/type/types';

import { createContext } from 'react';

import { useRequiredContext } from '@/shared/hooks';

export const SidebarTypePackContext = createContext<SidebarTypePack | null>(null);

export function useSidebarTypePack(): SidebarTypePack {
  return useRequiredContext(
    SidebarTypePackContext,
    'useSidebarTypePack must be used within SidebarTypePackProvider',
  );
}
