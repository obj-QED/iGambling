import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from '../types';
import type { MenuItemDto, MenuRootDto } from '@/shared/types/menu';

import { isSpecialBlockKey } from './itemUtils';

function resolveSectionKey(item: MenuItemDto): string {
  if (item.key.length > 0) return item.key;
  return item.name;
}

export function mapItem(item: MenuItemDto): HeaderMenuItem {
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

  if (item.badge !== undefined) {
    mapped.badge = item.badge;
  }

  if (item.subtitle !== undefined) {
    mapped.subtitle = item.subtitle;
  }

  if (item.label !== undefined) {
    mapped.label = item.label;
  }

  if (item.variant !== undefined) {
    mapped.variant = item.variant;
  }

  if (!isSpecialBlockKey(item.key) && item.type !== undefined) {
    mapped.type = item.type;
  }

  return mapped;
}

function mapSection(item: MenuItemDto): HeaderSection | null {
  const key = resolveSectionKey(item);
  if (key.length === 0) return null;

  const items = item.items?.map((entry) => mapItem(entry)) ?? [];

  return { key, items };
}

export function mapRoot(root: MenuRootDto): HeaderMenuModel {
  const sections = root.items
    .map((entry) => mapSection(entry))
    .filter((section): section is HeaderSection => section !== null);

  return { sections };
}

export function mapFlat(root: MenuRootDto, sectionKey: string): HeaderMenuModel {
  const items = root.items.map((entry) => mapItem(entry));

  return {
    sections: [{ key: sectionKey, items }],
  };
}
