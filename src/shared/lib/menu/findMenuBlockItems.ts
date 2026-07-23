import type { MenuItemDto } from '@/shared/types/menu';

import { isRecord } from '../coercion';
import { readString } from '../coercion';
import { parseMenuItemDto } from './parseMenuItem';

export const MENU_HEADER_TOP_BLOCK_TYPE = 'menuHeaderTop';

/** Reads `page.blocks[]` entry with matching `type` → `menu` items. */
export function findMenuBlockItems(page: unknown, blockType: string): MenuItemDto[] | null {
  if (!isRecord(page) || !Array.isArray(page.blocks)) return null;

  for (const block of page.blocks) {
    if (!isRecord(block)) continue;
    if (readString(block.type) !== blockType) continue;

    const menuRaw = block.menu;
    if (!Array.isArray(menuRaw)) return null;

    const items: MenuItemDto[] = [];
    for (const entry of menuRaw) {
      const parsed = parseMenuItemDto(entry);
      if (parsed !== null) items.push(parsed);
    }

    return items.length > 0 ? items : null;
  }

  return null;
}

/** @deprecated Prefer `findMenuBlockItems(page, MENU_HEADER_TOP_BLOCK_TYPE)`. */
export function findMenuHeaderTopItems(page: unknown): MenuItemDto[] | null {
  return findMenuBlockItems(page, MENU_HEADER_TOP_BLOCK_TYPE);
}
