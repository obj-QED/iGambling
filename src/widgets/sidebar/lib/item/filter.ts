import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from '@/widgets/header';

import { isRenderableItem } from './visibility';

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

export function hasRenderableMenuSections(menu: HeaderMenuModel): boolean {
  return menu.sections.some((section) => filterRenderableItems(section.items).length > 0);
}
