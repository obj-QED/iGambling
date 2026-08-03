import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';

import { isRenderableItem } from '../../../lib';
import { useSidebarTypePack } from '../../../typePacks';
import { SidebarExceptionButton } from '../../items/SidebarExceptionButton/SidebarExceptionButton';

/** Default search row; compact overrides via typePack.blocks.search_leftmenu. */
function SearchComponent({ item, className }: BlockProps) {
  const { itemKind, Item } = useSidebarTypePack();

  if (!isRenderableItem(item)) return null;

  const placeholder = item.name ?? 'Search';

  if (itemKind === 'actionIcon') {
    return <Item item={item} className={className} />;
  }

  return (
    <SidebarExceptionButton
      item={item}
      label={placeholder}
      leftSection={<IconSearch size={16} stroke={1.75} aria-hidden />}
      className={clsx(className)}
    />
  );
}

export const Search = memo(SearchComponent);
Search.displayName = 'SidebarSearch';
