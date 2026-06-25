import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from '../types';

import { HEADER_CONFIG_ONLY_BLOCK_KEYS } from '../types/items.types';

const CONFIG_ONLY_BLOCK_KEY_SET = new Set<string>(HEADER_CONFIG_ONLY_BLOCK_KEYS);

export function isConfigOnlyBlockKey(key: string): boolean {
  return CONFIG_ONLY_BLOCK_KEY_SET.has(key);
}

export function isRenderableItem(item: HeaderMenuItem): boolean {
  if (isConfigOnlyBlockKey(item.key)) return true;

  const hasName = item.name.trim().length > 0;
  const hasImg = (item.img?.trim().length ?? 0) > 0;
  return hasName || hasImg;
}

export function isIconOnlyItem(item: HeaderMenuItem): boolean {
  return item.name.trim().length === 0 && (item.img?.trim().length ?? 0) > 0;
}

export function hasItemName(item: HeaderMenuItem): boolean {
  return item.name.trim().length > 0;
}

export function hasItemImg(item: HeaderMenuItem): boolean {
  return (item.img?.trim().length ?? 0) > 0;
}

export function resolveItemLabel(item: HeaderMenuItem): string {
  const name = item.name.trim();
  if (name.length > 0) return name;
  return item.key;
}

export function resolveItemHref(url: string): string {
  const trimmed = url.trim();
  if (trimmed.length === 0) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return trimmed;
  return `/${trimmed.replace(/^\//, '')}`;
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
