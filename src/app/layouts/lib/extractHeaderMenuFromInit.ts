import type { HeaderMenuModel } from '@/widgets/header/types';
import type { InitV2Content } from '@api/lobby/types';

import { findMenuBlockItems, MENU_HEADER_TOP_BLOCK_TYPE } from '@/shared/lib/menu';
import { mapRoot } from '@/widgets/header/lib/mapMenu';

/** Extracts header menu from `page.blocks` → `menuHeaderTop.menu`. */
export function extractHeaderMenuFromInit(content: InitV2Content): HeaderMenuModel | null {
  const page = content.page;
  const items = findMenuBlockItems(page, MENU_HEADER_TOP_BLOCK_TYPE);
  if (items === null) return null;

  return mapRoot({
    key: 'menuHeaderTop',
    name: '',
    url: '',
    items,
  });
}
