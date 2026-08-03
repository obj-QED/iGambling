import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { isIconOnlyItem, isRenderableItem } from '../../../lib';
import { ItemActionIcon } from '../../items/ItemActionIcon/ItemActionIcon';
import { ItemButton } from '../../items/ItemButton/ItemButton';

function DefaultItemBlockComponent({ item }: BlockProps) {
  if (!isRenderableItem(item)) return null;

  if (isIconOnlyItem(item)) {
    return <ItemActionIcon item={item} />;
  }

  return <ItemButton item={item} />;
}

export const DefaultItemBlock = memo(DefaultItemBlockComponent);
DefaultItemBlock.displayName = 'DefaultItemBlock';
