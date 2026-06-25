import type { PageMenuItemDto } from '@/shared/types/pageMenu';

import { isRecord } from '../coercion';
import { readString } from '../coercion';
import { parsePageMenuItemDto } from './parsePageMenu';

export const MENU_HEADER_TOP_BLOCK_TYPE = 'menuHeaderTop';

/** Reads `page.blocks[]` entry with `type: menuHeaderTop` → `menu` items. */
export function findMenuHeaderTopItems(page: unknown): PageMenuItemDto[] | null {
  if (!isRecord(page) || !Array.isArray(page.blocks)) return null;

  for (const block of page.blocks) {
    if (!isRecord(block)) continue;
    if (readString(block.type) !== MENU_HEADER_TOP_BLOCK_TYPE) continue;

    const menuRaw = block.menu;
    if (!Array.isArray(menuRaw)) return null;

    const items: PageMenuItemDto[] = [];
    for (const entry of menuRaw) {
      const parsed = parsePageMenuItemDto(entry);
      if (parsed !== null) items.push(parsed);
    }

    return items.length > 0 ? items : null;
  }

  return null;
}
