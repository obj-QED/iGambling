import type { PageMenuItemDto } from '@/shared/types/pageMenu';
import type { HeaderMenuItem, HeaderMenuModel } from '@/widgets/header/types';

import { parsePageMenuItemDto } from '@/shared/lib/pageMenu';
import { mapRoot } from '@/widgets/header/lib/mapMenu';
import { MENU_HEADER_TOP_MOCK } from '@/widgets/header/mocks/menuHeaderTop/menuHeaderTop.mock';

function parseMockItems(): PageMenuItemDto[] {
  const items: PageMenuItemDto[] = [];

  for (const entry of MENU_HEADER_TOP_MOCK.menu) {
    const parsed = parsePageMenuItemDto(entry);
    if (parsed !== null) items.push(parsed);
  }

  return items;
}

export function createHeaderMenuFixture(): HeaderMenuModel {
  return mapRoot({
    key: 'menuHeaderTop',
    name: '',
    url: '',
    items: parseMockItems(),
  });
}

export function findHeaderMenuItem(menu: HeaderMenuModel, key: string): HeaderMenuItem | undefined {
  for (const section of menu.sections) {
    const found = findInItems(section.items, key);
    if (found !== undefined) return found;
  }

  return undefined;
}

function findInItems(items: HeaderMenuItem[], key: string): HeaderMenuItem | undefined {
  for (const item of items) {
    if (item.key === key) return item;
    const nested = item.items;
    if (nested !== undefined) {
      const found = findInItems(nested, key);
      if (found !== undefined) return found;
    }
  }

  return undefined;
}
