import type { HeaderMenuItem } from '../types';
import type { CmfActionIconVariant, CmfButtonVariant } from '@/assets/theme';

type MenuItemVariantSource = Pick<HeaderMenuItem, 'type' | 'variant'>;

/** Explicit menu `variant` string, if non-empty. */
export function resolveMenuItemExplicitVariant(
  item: Pick<HeaderMenuItem, 'variant'>,
): string | undefined {
  const value = item.variant?.trim() ?? '';
  return value.length > 0 ? value : undefined;
}

/**
 * Header Button / AppLogo control variant.
 * Same spirit as aside: explicit `variant` → `type: link` transparent → else default.
 * Applies to specials too when they render Button.
 */
export function resolveMenuItemButtonVariant(item: MenuItemVariantSource): CmfButtonVariant {
  const explicit = resolveMenuItemExplicitVariant(item);
  if (explicit) return explicit as CmfButtonVariant;

  if (item.type === 'link') return 'transparent';
  return 'default';
}

/**
 * Header ActionIcon control variant.
 * explicit `variant` → `type: link` transparent → else default.
 * Applies to specials (wallet/search/notification/…) when they render ActionIcon.
 */
export function resolveMenuItemActionIconVariant(
  item: MenuItemVariantSource,
): CmfActionIconVariant {
  const explicit = resolveMenuItemExplicitVariant(item);
  if (explicit) return explicit as CmfActionIconVariant;

  if (item.type === 'link') return 'transparent';
  return 'default';
}
