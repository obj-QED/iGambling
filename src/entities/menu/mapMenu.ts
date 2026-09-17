import type { MenuItem, MenuModel, MenuSection } from './types';
import type { MenuItemDto, MenuRootDto } from '@/shared/types/menu';

function resolveSectionKey(item: MenuItemDto): string {
  return item.key.length > 0 ? item.key : item.name;
}

export function mapMenuItem(item: MenuItemDto): MenuItem {
  const items = item.items?.map(mapMenuItem);
  const mapped: MenuItem = {
    key: item.key,
    name: item.name,
    url: item.url,
    img: item.img,
    imgShape: item.imgShape,
    imgRadius: item.imgRadius,
    items: items !== undefined && items.length > 0 ? items : undefined,
  };
  if (item.badge !== undefined) mapped.badge = item.badge;
  if (item.subtitle !== undefined) mapped.subtitle = item.subtitle;
  if (item.label !== undefined) mapped.label = item.label;
  if (item.menuIcon === true) mapped.menuIcon = true;
  if (item.railMedia !== undefined) mapped.railMedia = item.railMedia;
  if (item.variant !== undefined) mapped.variant = item.variant;
  if (item.type !== undefined) mapped.type = item.type;
  return mapped;
}

function mapMenuSection(item: MenuItemDto): MenuSection | null {
  const key = resolveSectionKey(item);
  return key.length > 0 ? { key, items: item.items?.map(mapMenuItem) ?? [] } : null;
}

export function mapMenuRoot(root: MenuRootDto): MenuModel {
  return {
    sections: root.items
      .map(mapMenuSection)
      .filter((section): section is MenuSection => section !== null),
  };
}

export function mapFlatMenu(root: MenuRootDto, sectionKey: string): MenuModel {
  return { sections: [{ key: sectionKey, items: root.items.map(mapMenuItem) }] };
}
