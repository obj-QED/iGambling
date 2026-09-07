import { useContext } from 'react';

import { SidebarSlideoutContext } from './context';

export function useSidebarSlideout() {
  return useContext(SidebarSlideoutContext);
}
