import type { HeaderMenuModel } from '@/widgets/header';
import type { InitV2Content } from '@api/lobby/types';

import { getSidebarMenuMock } from '@/widgets/sidebar/mocks/getSidebarMenuMock';

import { extractPageMenuFromInit } from './extractPageMenuFromInit';

/** Mock menu when enabled in settings; otherwise `page.menu` entry with key `left`. */
export function resolveSidebarMenu(content: InitV2Content | undefined): HeaderMenuModel | null {
  const mockMenu = getSidebarMenuMock();
  if (mockMenu !== null) return mockMenu;

  if (content === undefined) return null;
  return extractPageMenuFromInit(content, 'left', 'flat');
}
