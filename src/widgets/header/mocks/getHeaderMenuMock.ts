import type { HeaderMenuModel } from '../types';
import type { MenuHeaderTopBlockMock } from './menuHeaderTop/types';
import type { PageMenuItemDto } from '@/shared/types/pageMenu';

import { getSettings } from '@/shared/config';
import { parsePageMenuItemDto } from '@/shared/lib/pageMenu';

import { mapRoot } from '../lib/mapMenu';
import { MENU_HEADER_TOP_AUTHENTICATED_MOCK } from './menuHeaderTop/menuHeaderTop.authenticated.mock';
import { MENU_HEADER_TOP_GUEST_MOCK } from './menuHeaderTop/menuHeaderTop.guest.mock';

export type GetHeaderMenuMockOptions = {
  isAuthenticated?: boolean;
};

function parseMockMenuItems(block: MenuHeaderTopBlockMock): PageMenuItemDto[] {
  const items: PageMenuItemDto[] = [];

  for (const entry of block.menu) {
    const parsed = parsePageMenuItemDto(entry);
    if (parsed !== null) items.push(parsed);
  }

  return items;
}

function resolveIsAuthenticated(options?: GetHeaderMenuMockOptions): boolean {
  if (options?.isAuthenticated !== undefined) return options.isAuthenticated;

  const mockAuth = getSettings().header?.mockAuth;
  if (mockAuth === 'guest') return false;
  return true;
}

/** Returns mock header menu when `window.__SETTINGS__.header.mockMenu === true`. */
export function getHeaderMenuMock(options?: GetHeaderMenuMockOptions): HeaderMenuModel | null {
  if (getSettings().header?.mockMenu !== true) return null;

  const block = resolveIsAuthenticated(options)
    ? MENU_HEADER_TOP_AUTHENTICATED_MOCK
    : MENU_HEADER_TOP_GUEST_MOCK;

  const items = parseMockMenuItems(block);
  if (items.length === 0) return null;

  return mapRoot({
    key: 'menuHeaderTop',
    name: '',
    url: '',
    items,
  });
}
