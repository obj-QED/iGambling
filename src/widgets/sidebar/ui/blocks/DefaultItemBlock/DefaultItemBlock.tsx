import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { isRenderableItem } from '../../../lib/itemUtils';
import { ItemButton } from '../../menu/ItemButton/ItemButton';

function DefaultItemBlockComponent({ item }: BlockProps) {
  if (isRenderableItem(item) === false) return null;

  return <ItemButton item={item} />;
}

export const DefaultItemBlock = memo(DefaultItemBlockComponent);
DefaultItemBlock.displayName = 'DefaultItemBlock';
