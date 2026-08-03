import type { MenuItemApiType } from '@/shared/types/menu';

export type MenuApiTypeAttrs = {
  'api-type': MenuItemApiType;
};

export function isMenuItemApiType(value: unknown): value is MenuItemApiType {
  return value === 'button' || value === 'link';
}

/** DOM attr from API menu `type` (`button` | `link`). Omits when unset/unknown. */
export function menuApiTypeAttrs(type: unknown): MenuApiTypeAttrs | Record<string, never> {
  if (!isMenuItemApiType(type)) return {};
  return { 'api-type': type };
}
