import type { CmfActionIconVariant, CmfButtonVariant } from '@/assets/theme';
import type { HeaderMenuItem } from '@/widgets/header';

import {
  isSidebarSpecialBlockKey,
  type SidebarSpecialBlockKey,
} from '../config/sidebarSpecialBlockKeys';

type MenuItemVariantSource = Pick<HeaderMenuItem, 'key' | 'type' | 'variant'>;

export const SIDEBAR_EXCEPTION_VARIANT_PREFIX = 'exception-' as const;

export type SidebarExceptionButtonVariant =
  `${typeof SIDEBAR_EXCEPTION_VARIANT_PREFIX}${SidebarSpecialBlockKey}`;

export type SidebarMenuButtonVariant = CmfButtonVariant | SidebarExceptionButtonVariant;

const DEFAULT_CONTROL_VARIANT = 'transparent' as const;

/** Explicit menu `variant` string, if non-empty. */
export function resolveMenuItemExplicitVariant(
  item: Pick<HeaderMenuItem, 'variant'>,
): string | undefined {
  const value = item.variant?.trim() ?? '';
  return value.length > 0 ? value : undefined;
}

/** ScrollArea special blocks (search, timer, wheel) — visually distinct CTA. */
export function isSidebarExceptionBlockItem(item: MenuItemVariantSource): boolean {
  return item.key !== undefined && isSidebarSpecialBlockKey(item.key);
}

export function resolveSidebarExceptionButtonVariant(
  key: SidebarSpecialBlockKey,
): SidebarExceptionButtonVariant {
  return `${SIDEBAR_EXCEPTION_VARIANT_PREFIX}${key}`;
}

/**
 * Aside buttons: explicit `variant` → special `exception-{key}` → `type: button` outline → transparent.
 */
export function resolveMenuItemButtonVariant(
  item: MenuItemVariantSource,
): SidebarMenuButtonVariant {
  const explicit = resolveMenuItemExplicitVariant(item);
  if (explicit) return explicit as SidebarMenuButtonVariant;

  if (isSidebarExceptionBlockItem(item) && item.key !== undefined) {
    return resolveSidebarExceptionButtonVariant(item.key as SidebarSpecialBlockKey);
  }
  if (item.type === 'button') return 'outline';
  return DEFAULT_CONTROL_VARIANT;
}

/**
 * ActionIcon: explicit `variant` → `type: button` outline → transparent.
 * Never uses `exception-{key}`.
 */
export function resolveMenuItemActionIconVariant(
  item: MenuItemVariantSource,
): CmfActionIconVariant {
  const explicit = resolveMenuItemExplicitVariant(item);
  if (explicit) return explicit as CmfActionIconVariant;

  if (item.type === 'button') return 'outline';
  return DEFAULT_CONTROL_VARIANT;
}

/**
 * Logo chrome (ActionIcon + AppLogo): explicit `variant` or transparent.
 * Does not follow `type` / exception rules — logo owns its look via `variant` only.
 */
export function resolveLogoControlVariant(item: Pick<HeaderMenuItem, 'variant'>): string {
  return resolveMenuItemExplicitVariant(item) ?? DEFAULT_CONTROL_VARIANT;
}
