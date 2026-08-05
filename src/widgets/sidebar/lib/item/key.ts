import type { HeaderMenuItem } from '@/widgets/header';

export function itemKey(item: HeaderMenuItem): string {
  return item.key ?? '';
}

export function itemName(item: HeaderMenuItem): string {
  return item.name ?? '';
}

export function itemImg(item: HeaderMenuItem): string {
  return item.img ?? '';
}

export function menuItemKeyAttr(item: HeaderMenuItem): { 'data-key': string } {
  return { 'data-key': itemKey(item) };
}
