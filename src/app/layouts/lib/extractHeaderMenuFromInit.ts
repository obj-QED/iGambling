import type { MenuModel as HeaderMenuModel } from '@/entities/menu';
import type { InitV2Content } from '@api/lobby/types';

import { mapMenuRoot } from '@/entities/menu';
import { findMenuBlockItems, MENU_HEADER_TOP_BLOCK_TYPE } from '@/shared/lib/menu';

/** Extracts header menu from `page.blocks` → `menuHeaderTop.menu`. */
export function extractHeaderMenuFromInit(content: InitV2Content): HeaderMenuModel | null {
  const page = content.page;
  const items = findMenuBlockItems(page, MENU_HEADER_TOP_BLOCK_TYPE);
  if (items === null) return null;

  return mapMenuRoot({
    key: 'menuHeaderTop',
    name: '',
    url: '',
    items,
  });
}
