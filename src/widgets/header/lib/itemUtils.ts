import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from '../types';

import { isHeaderSpecialBlockKey } from '@/shared/config/headerSpecialBlockKeys';
import { cmfScopeAttrs } from '@/shared/lib/cmf/cmfScopeAttrs';

import { HEADER_CONFIG_ONLY_BLOCK_KEYS } from '../types/items.types';

const CONFIG_ONLY_BLOCK_KEY_SET = new Set<string>(HEADER_CONFIG_ONLY_BLOCK_KEYS);

function itemName(item: HeaderMenuItem): string {
  return item.name ?? '';
}

function itemImg(item: HeaderMenuItem): string {
  return item.img ?? '';
}

function itemKey(item: HeaderMenuItem): string {
  return item.key ?? '';
}

export function isSpecialBlockKey(key: string | undefined): boolean {
  return isHeaderSpecialBlockKey(key ?? '');
}

export function isConfigOnlyBlockKey(key: string | undefined): boolean {
  return CONFIG_ONLY_BLOCK_KEY_SET.has(key ?? '');
}

export function isRenderableItem(item: HeaderMenuItem): boolean {
  if (isConfigOnlyBlockKey(item.key)) return true;

  return itemName(item).length > 0 || itemImg(item).length > 0;
}

export function isIconOnlyItem(item: HeaderMenuItem): boolean {
  return itemName(item).length === 0 && itemImg(item).length > 0;
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

export const HEADER_CMF_COMPONENT = 'header';

export function resolveMenuItemTypeAttr(item: HeaderMenuItem): string {
  return item.type ?? 'button';
}

export function menuItemDataAttrs(item: HeaderMenuItem): {
  'data-cmf-component': typeof HEADER_CMF_COMPONENT;
  'data-cmf-key': string;
  'data-menu-key': string;
  'data-menu-type'?: string;
} {
  const key = itemKey(item);
  const scope = {
    ...cmfScopeAttrs(HEADER_CMF_COMPONENT, key),
    'data-menu-key': key,
  };

  if (isSpecialBlockKey(item.key)) {
    return scope;
  }

  return {
    ...scope,
    'data-menu-type': resolveMenuItemTypeAttr(item),
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

export function hasRenderableMenu(menu: HeaderMenuModel): boolean {
  return filterRenderableMenu(menu).sections.length > 0;
}
