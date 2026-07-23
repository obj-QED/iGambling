import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';

import { isRenderableItem } from '../../../lib/itemUtils';
import { SidebarExceptionButton } from '../../menu/SidebarExceptionButton/SidebarExceptionButton';

function SearchLeftMenuBlockComponent({ item, className }: BlockProps) {
  if (isRenderableItem(item) === false) return null;

  const placeholder = item.name ?? 'Search';

  return (
    <SidebarExceptionButton
      item={item}
      label={placeholder}
      leftSection={<IconSearch size={16} stroke={1.75} aria-hidden />}
      className={clsx(className)}
    />
  );
}

export const SearchLeftMenuBlock = memo(SearchLeftMenuBlockComponent);
SearchLeftMenuBlock.displayName = 'SearchLeftMenuBlock';
