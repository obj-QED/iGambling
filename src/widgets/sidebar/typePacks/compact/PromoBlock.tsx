import type { BlockProps } from '../../types';

import { memo } from 'react';

import { useMenuItemRenderable } from '../../hooks';
import { isRenderableItem } from '../../lib';
import { useSidebarTypePack } from '../useSidebarTypePack';

function CompactPromoBlockComponent({ item, className }: BlockProps) {
  const { Item } = useSidebarTypePack();
  const { visible } = useMenuItemRenderable(item);

  if (!isRenderableItem(item) || !visible) return null;

  return <Item item={item} className={className} />;
}

export const CompactPromoBlock = memo(CompactPromoBlockComponent);
CompactPromoBlock.displayName = 'SidebarCompactPromoBlock';
