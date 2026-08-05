import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from '../types';

import { isHeaderSpecialBlockKey } from '@/shared/config/headerSpecialBlockKeys';

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

/** Deep-menu eligibility: name and/or img — no config-only / special-block bypass. */
export function isDeepPanelItemEligible(item: HeaderMenuItem): boolean {
  return itemName(item).length > 0 || itemImg(item).length > 0;
}

export function hasItemName(item: HeaderMenuItem): boolean {
  return itemName(item).length > 0;
}

export function hasItemImg(item: HeaderMenuItem): boolean {
  return itemImg(item).length > 0;
}

/** Visible control title — `name` only. `label` is tooltip/HTML copy (see AppTooltip). */
export function resolveItemLabel(item: HeaderMenuItem): string {
  const name = itemName(item);
  if (name.length > 0) return name;
  return itemKey(item);
}

export { resolveItemHref } from '@/shared/lib';

export function filterRenderableItems(items: HeaderMenuItem[]): HeaderMenuItem[] {
  const result: HeaderMenuItem[] = [];

  for (const item of items) {
    const nested = item.items;
    if (nested !== undefined && nested.length > 0) {
      const children = filterRenderableItems(nested);
      if (children.length === 0 || !isRenderableItem(item)) continue;
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
