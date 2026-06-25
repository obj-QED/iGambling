import type { HeaderMenuModel } from '@/widgets/header/types';
import type { InitV2Content } from '@api/lobby/types';

import { findMenuHeaderTopItems } from '@/shared/lib/pageMenu';
import { mapRoot } from '@/widgets/header/lib/mapMenu';

/** Extracts header menu from `page.blocks` → `menuHeaderTop.menu`. */
export function extractHeaderMenuFromInit(content: InitV2Content): HeaderMenuModel | null {
  const page = content.page;
  const items = findMenuHeaderTopItems(page);
  if (items === null) return null;

  return mapRoot({
    key: 'menuHeaderTop',
    name: '',
    url: '',
    items,
  });
}
