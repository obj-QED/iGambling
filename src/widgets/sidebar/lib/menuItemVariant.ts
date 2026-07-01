import type { CmfButtonVariant } from '@/assets/theme';
import type { HeaderMenuItem } from '@/widgets/header';

type MenuItemVariantSource = Pick<HeaderMenuItem, 'key' | 'type'>;

/** Aside: `link` (or missing type) → transparent; `button` → outline. */
export function resolveMenuItemButtonVariant(item: MenuItemVariantSource): CmfButtonVariant {
  if (item.type === 'button') return 'outline';
  return 'transparent';
}
