import type { HeaderMenuModel } from '@/widgets/header';

import { getSettings } from '@/shared/config';

import { SIDEBAR_MENU_MOCK } from './sidebarMenu.mock';

/** Returns mock sidebar menu when `window.__SETTINGS__.aside.mockMenu === true`. */
export function getSidebarMenuMock(): HeaderMenuModel | null {
  if (getSettings().aside?.mockMenu !== true) return null;
  return SIDEBAR_MENU_MOCK;
}
