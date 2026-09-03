import { useContext } from 'react';

import {
  SIDEBAR_DRAWER_FALLBACK,
  SidebarDrawerContext,
  type SidebarDrawerContextValue,
} from './sidebarDrawerContext';

/** Soft fallback when provider is missing (Storybook / isolated header). */
export function useSidebarDrawer(): SidebarDrawerContextValue {
  return useContext(SidebarDrawerContext) ?? SIDEBAR_DRAWER_FALLBACK;
}
