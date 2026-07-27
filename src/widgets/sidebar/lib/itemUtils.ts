import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from '@/widgets/header';

import { cmfScopeAttrs } from '@/shared/lib/cmf/cmfScopeAttrs';
import { menuApiTypeAttrs } from '@/shared/lib/menu';

import { isSidebarSpecialBlockKey } from '../config/sidebarSpecialBlockKeys';

export const SIDEBAR_CMF_COMPONENT = 'sidebar';

function itemName(item: HeaderMenuItem): string {
  return item.name ?? '';
}

function itemImg(item: HeaderMenuItem): string {
  return item.img ?? '';
}

function itemKey(item: HeaderMenuItem): string {
  return item.key ?? '';
}

export { itemKey };

export function isSpecialBlockKey(key: string | undefined): boolean {
  return isSidebarSpecialBlockKey(key ?? '');
}

export function isRenderableItem(item: HeaderMenuItem): boolean {
  return itemName(item).length > 0 || itemImg(item).length > 0;
}

/** Icon-only item — visible while `img` loads; hidden after `onError` when `name` is empty. */
export function isIconOnlyItem(item: HeaderMenuItem): boolean {
  return hasItemName(item) === false && hasItemImg(item) === true;
}

/**
 * Runtime visibility: no `name` + no `img`, or icon-only with failed `img` → do not render.
 */
export function shouldRenderMenuItem(item: HeaderMenuItem, imgFailed: boolean): boolean {
  if (isRenderableItem(item) === false) return false;
  if (hasItemName(item) === false && imgFailed === true) return false;
  return true;
}

export function hasItemName(item: HeaderMenuItem): boolean {
  return itemName(item).length > 0;
}

export function hasItemImg(item: HeaderMenuItem): boolean {
  return itemImg(item).length > 0;
}

export function resolveItemLabel(item: HeaderMenuItem): string {
  const name = itemName(item);
  if (name.length > 0) return name;
  return itemKey(item);
}

export { resolveItemHref } from '@/shared/lib';

export function menuItemKeyAttr(item: HeaderMenuItem): { 'data-key': string } {
  return { 'data-key': itemKey(item) };
}

export function menuItemDataAttrs(item: HeaderMenuItem): {
  'data-cmf-component': typeof SIDEBAR_CMF_COMPONENT;
  'data-cmf-key': string;
  'data-key': string;
  'api-type'?: 'button' | 'link';
} {
  return {
    ...menuItemKeyAttr(item),
    ...(cmfScopeAttrs(SIDEBAR_CMF_COMPONENT, itemKey(item)) as {
      'data-cmf-component': typeof SIDEBAR_CMF_COMPONENT;
      'data-cmf-key': string;
    }),
    ...menuApiTypeAttrs(item.type),
  };
}

export function filterRenderableItems(items: HeaderMenuItem[]): HeaderMenuItem[] {
  const result: HeaderMenuItem[] = [];

  for (const item of items) {
    const nested = item.items;
    if (nested !== undefined && nested.length > 0) {
      const children = filterRenderableItems(nested);
      if (children.length === 0 || isRenderableItem(item) === false) continue;
      result.push({ ...item, items: children });
      continue;
    }

    if (isRenderableItem(item)) {
      result.push(item);
    }
  }

  return result;
}

export function filterRenderableMenu(menu: HeaderMenuModel): HeaderMenuModel {
  const sections: HeaderSection[] = [];

  for (const section of menu.sections) {
    const items = filterRenderableItems(section.items);
    if (items.length > 0) {
      sections.push({ ...section, items });
    }
  }

  return { sections };
}
