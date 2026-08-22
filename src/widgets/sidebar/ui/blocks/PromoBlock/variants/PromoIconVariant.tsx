import type { BlockProps } from '../../../../types';

import { memo } from 'react';

import { useMenuItemRenderable } from '../../../../hooks';
import { isRenderableItem } from '../../../../lib';
import { useSidebarTypePack } from '../../../type';

/**
 * Compact / icon promo — same ActionIcon template as other compact rows
 * (`CompactItem` → `ItemActionIcon`).
 */
function PromoIconVariantComponent({ item, className }: BlockProps) {
  const { Item } = useSidebarTypePack();
  const { visible } = useMenuItemRenderable(item);

  if (!isRenderableItem(item) || !visible) return null;

  return <Item item={item} className={className} />;
}

export const PromoIconVariant = memo(PromoIconVariantComponent);
PromoIconVariant.displayName = 'SidebarPromoIconVariant';
export default PromoIconVariant;
