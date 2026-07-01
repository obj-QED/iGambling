import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from '../types';
import type { PageMenuItemDto, PageMenuRootDto } from '@/shared/types/pageMenu';

import { isSpecialBlockKey } from './itemUtils';

function resolveSectionKey(item: PageMenuItemDto): string {
  if (item.key.length > 0) return item.key;
  return item.name;
}

export function mapItem(item: PageMenuItemDto): HeaderMenuItem {
  const items = item.items?.map((child) => mapItem(child));

  const mapped: HeaderMenuItem = {
    key: item.key,
    name: item.name,
    url: item.url,
    img: item.img,
    imgShape: item.imgShape,
    imgRadius: item.imgRadius,
    items: items !== undefined && items.length > 0 ? items : undefined,
  };

  if (isSpecialBlockKey(item.key) === false && item.type !== undefined) {
    mapped.type = item.type;
  }

  return mapped;
}

function mapSection(item: PageMenuItemDto): HeaderSection | null {
  const key = resolveSectionKey(item);
  if (key.length === 0) return null;

  const items = item.items?.map((entry) => mapItem(entry)) ?? [];

  return { key, items };
}

export function mapRoot(root: PageMenuRootDto): HeaderMenuModel {
  const sections = root.items
    .map((entry) => mapSection(entry))
    .filter((section): section is HeaderSection => section !== null);

  return { sections };
}

export function mapFlat(root: PageMenuRootDto, sectionKey: string): HeaderMenuModel {
  const items = root.items.map((entry) => mapItem(entry));

  return {
    sections: [{ key: sectionKey, items }],
  };
}
