import type { SidebarSchema } from '../../types';

import { useRequiredContext } from '@/shared/hooks';

import { SidebarConfigContext } from './context';

export function useSidebarConfig(): SidebarSchema {
  return useRequiredContext(
    SidebarConfigContext,
    'useSidebarConfig must be used within SidebarConfigProvider',
  );
}
