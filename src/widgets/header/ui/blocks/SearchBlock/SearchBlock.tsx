import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { IconSearch } from '@tabler/icons-react';

import { HEADER_TABLER_ICON_PROPS } from '../../items/icons/iconProps';
import { SpecialIconBlock } from '../shared/SpecialIconBlock';

function SearchBlockComponent({ item }: BlockProps) {
  return (
    <SpecialIconBlock item={item} fallbackIcon={<IconSearch {...HEADER_TABLER_ICON_PROPS} />} />
  );
}

export const SearchBlock = memo(SearchBlockComponent);
SearchBlock.displayName = 'SearchBlock';
