import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { isIconOnlyItem, isRenderableItem } from '../../../lib/itemUtils';
import { ItemActionIcon } from '../../menu/ItemActionIcon/ItemActionIcon';
import { ItemButton } from '../../menu/ItemButton/ItemButton';

function DefaultItemBlockComponent({ item }: BlockProps) {
  if (isRenderableItem(item) === false) return null;

  if (isIconOnlyItem(item) === true) {
    return <ItemActionIcon item={item} />;
  }

  return <ItemButton item={item} />;
}

export const DefaultItemBlock = memo(DefaultItemBlockComponent);
DefaultItemBlock.displayName = 'DefaultItemBlock';
