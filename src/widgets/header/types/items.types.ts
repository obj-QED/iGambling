import type { MenuItem, MenuModel, MenuSection } from '@/entities/menu';

import {
  HEADER_SPECIAL_BLOCK_KEYS,
  type HeaderSpecialBlockKey,
} from '@/shared/config/headerSpecialBlockKeys';

export { HEADER_SPECIAL_BLOCK_KEYS, type HeaderSpecialBlockKey };

export type HeaderMenuItemType = 'button' | 'link';

/** @deprecated Import `MenuItem` from `@/entities/menu`. */
export type HeaderMenuItem = MenuItem;
/** @deprecated Import `MenuSection` from `@/entities/menu`. */
export type HeaderSection = MenuSection;
/** @deprecated Import `MenuModel` from `@/entities/menu`. */
export type HeaderMenuModel = MenuModel;

export const HEADER_CONFIG_ONLY_BLOCK_KEYS = ['color_scheme', 'menu_toggle'] as const;

export type HeaderConfigOnlyBlockKey = (typeof HEADER_CONFIG_ONLY_BLOCK_KEYS)[number];

/**
 * Adapter variants from settings. Keys/values are open — new special blocks and
 * unregistered strings pass through; `useAdapter` falls back per block registry.
 */
export type HeaderBlockVariants = Partial<Record<string, string>>;
