import type { HeaderMenuItem } from '@/widgets/header';

import { isSidebarSpecialBlockKey } from '../../config/sidebarSpecialBlockKeys';
import { itemImg, itemName } from './key';

export function isSpecialBlockKey(key: string | undefined): boolean {
  return isSidebarSpecialBlockKey(key ?? '');
}

export function hasItemName(item: HeaderMenuItem): boolean {
  return itemName(item).length > 0;
}

export function hasItemImg(item: HeaderMenuItem): boolean {
  return itemImg(item).length > 0;
}

export function isRenderableItem(item: HeaderMenuItem): boolean {
  return hasItemName(item) || hasItemImg(item);
}

/** Icon-only item — visible while `img` loads; hidden after `onError` when `name` is empty. */
export function isIconOnlyItem(item: HeaderMenuItem): boolean {
  return !hasItemName(item) && hasItemImg(item);
}

/** Runtime visibility: no `name` + no `img`, or icon-only with failed `img` → do not render. */
export function shouldRenderMenuItem(item: HeaderMenuItem, imgFailed: boolean): boolean {
  if (!isRenderableItem(item)) return false;
  if (!hasItemName(item) && imgFailed) return false;
  return true;
}
