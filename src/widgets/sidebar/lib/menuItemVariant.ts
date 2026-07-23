import type { CmfActionIconVariant, CmfButtonVariant } from '@/assets/theme';
import type { HeaderMenuItem } from '@/widgets/header';

import {
  isSidebarSpecialBlockKey,
  type SidebarSpecialBlockKey,
} from '../config/sidebarSpecialBlockKeys';

type MenuItemVariantSource = Pick<HeaderMenuItem, 'key' | 'type'>;

export const SIDEBAR_EXCEPTION_VARIANT_PREFIX = 'exception-' as const;

export type SidebarExceptionButtonVariant =
  `${typeof SIDEBAR_EXCEPTION_VARIANT_PREFIX}${SidebarSpecialBlockKey}`;

export type SidebarMenuButtonVariant = CmfButtonVariant | SidebarExceptionButtonVariant;

/** ScrollArea special blocks (search, timer, wheel) — visually distinct CTA. */
export function isSidebarExceptionBlockItem(item: MenuItemVariantSource): boolean {
  return item.key !== undefined && isSidebarSpecialBlockKey(item.key);
}

export function resolveSidebarExceptionButtonVariant(
  key: SidebarSpecialBlockKey,
): SidebarExceptionButtonVariant {
  return `${SIDEBAR_EXCEPTION_VARIANT_PREFIX}${key}`;
}

/** Aside: special blocks → `exception-{key}`; `button` → outline; link/missing → transparent. */
export function resolveMenuItemButtonVariant(
  item: MenuItemVariantSource,
): SidebarMenuButtonVariant {
  if (isSidebarExceptionBlockItem(item) === true && item.key !== undefined) {
    return resolveSidebarExceptionButtonVariant(item.key as SidebarSpecialBlockKey);
  }
  if (item.type === 'button') return 'outline';
  return 'transparent';
}

/** ActionIcon never uses `exception-{key}` — maps menu `type` to CMF ActionIcon variant. */
export function resolveMenuItemActionIconVariant(
  item: MenuItemVariantSource,
): CmfActionIconVariant {
  if (item.type === 'button') return 'outline';
  return 'transparent';
}
