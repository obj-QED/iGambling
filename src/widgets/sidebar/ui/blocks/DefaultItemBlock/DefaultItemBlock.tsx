import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { isRenderableItem } from '../../../lib';
import { useSidebarTypePack } from '../../type';

function DefaultItemBlockComponent({ item, className }: BlockProps) {
  const { Item } = useSidebarTypePack();

  if (!isRenderableItem(item)) return null;

  return <Item item={item} className={className} />;
}

export const DefaultItemBlock = memo(DefaultItemBlockComponent);
DefaultItemBlock.displayName = 'SidebarDefaultItemBlock';
