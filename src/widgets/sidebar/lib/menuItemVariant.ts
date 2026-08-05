import type { CmfActionIconVariant, CmfButtonVariant } from '@/assets/theme';
import type { HeaderMenuItem } from '@/widgets/header';

type MenuItemVariantSource = Pick<HeaderMenuItem, 'key' | 'type' | 'variant'>;

export type SidebarMenuButtonVariant = CmfButtonVariant;

const DEFAULT_CONTROL_VARIANT = 'transparent' as const;

/** Explicit menu `variant` string, if non-empty. */
export function resolveMenuItemExplicitVariant(
  item: Pick<HeaderMenuItem, 'variant'>,
): string | undefined {
  const value = item.variant?.trim() ?? '';
  return value.length > 0 ? value : undefined;
}

/**
 * Aside buttons: explicit `variant` → `type: button` default → transparent.
 * Special blocks (search/timer/wheel) style via `data-cmf-key` tokens — not custom variants.
 */
export function resolveMenuItemButtonVariant(
  item: MenuItemVariantSource,
): SidebarMenuButtonVariant {
  const explicit = resolveMenuItemExplicitVariant(item);
  if (explicit) return explicit as SidebarMenuButtonVariant;

  if (item.type === 'button') return 'default';
  return DEFAULT_CONTROL_VARIANT;
}

/**
 * ActionIcon: explicit `variant` → `type: button` default → transparent.
 */
export function resolveMenuItemActionIconVariant(
  item: MenuItemVariantSource,
): CmfActionIconVariant {
  const explicit = resolveMenuItemExplicitVariant(item);
  if (explicit) return explicit as CmfActionIconVariant;

  if (item.type === 'button') return 'default';
  return DEFAULT_CONTROL_VARIANT;
}

/**
 * Logo chrome (ActionIcon + AppLogo): explicit `variant` or transparent.
 * Does not follow `type` rules — logo owns its look via `variant` only.
 */
export function resolveLogoControlVariant(item: Pick<HeaderMenuItem, 'variant'>): string {
  return resolveMenuItemExplicitVariant(item) ?? DEFAULT_CONTROL_VARIANT;
}
