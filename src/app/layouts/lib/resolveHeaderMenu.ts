import type { HeaderMenuModel } from '@/widgets/header/types';
import type { InitV2Content } from '@api/lobby/types';

import { getHeaderMenuMock } from '@/widgets/header/mocks';

import { extractHeaderMenuFromInit } from './extractHeaderMenuFromInit';

/** Mock menu when enabled in settings; otherwise `page.blocks` → `menuHeaderTop.menu`. */
export function resolveHeaderMenu(content: InitV2Content | undefined): HeaderMenuModel | null {
  const mockMenu = getHeaderMenuMock();
  if (mockMenu !== null) return mockMenu;

  if (content === undefined) return null;
  return extractHeaderMenuFromInit(content);
}
