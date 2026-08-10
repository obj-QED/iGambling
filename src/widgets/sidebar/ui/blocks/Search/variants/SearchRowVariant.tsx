import type { BlockProps } from '../../../../types';

import { memo } from 'react';

import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';

import { isRenderableItem } from '../../../../lib';
import { SidebarExceptionButton } from '../../../items/SidebarExceptionButton/SidebarExceptionButton';

/** Default aside search row (full-width exception button). */
function SearchRowVariantComponent({ item, className }: BlockProps) {
  if (!isRenderableItem(item)) return null;

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

export const SearchRowVariant = memo(SearchRowVariantComponent);
SearchRowVariant.displayName = 'SidebarSearchRowVariant';
