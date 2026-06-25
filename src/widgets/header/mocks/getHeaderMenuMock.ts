import type { HeaderMenuModel } from '../types';
import type { PageMenuItemDto } from '@/shared/types/pageMenu';

import { getSettings } from '@/shared/config';
import { parsePageMenuItemDto } from '@/shared/lib/pageMenu';

import { mapRoot } from '../lib/mapMenu';
import { MENU_HEADER_TOP_MOCK } from './menuHeaderTop/menuHeaderTop.mock';

function parseMockMenuItems(): PageMenuItemDto[] {
  const items: PageMenuItemDto[] = [];

  for (const entry of MENU_HEADER_TOP_MOCK.menu) {
    const parsed = parsePageMenuItemDto(entry);
    if (parsed !== null) items.push(parsed);
  }

  return items;
}

/** Returns mock header menu when `window.__SETTINGS__.header.mockMenu === true`. */
export function getHeaderMenuMock(): HeaderMenuModel | null {
  if (getSettings().header?.mockMenu !== true) return null;

  const items = parseMockMenuItems();
  if (items.length === 0) return null;

  return mapRoot({
    key: 'menuHeaderTop',
    name: '',
    url: '',
    items,
  });
}
