import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { IconSearch } from '@tabler/icons-react';

import { HEADER_TABLER_ICON_PROPS } from '../../menu/icons/iconProps';
import { SpecialIconBlock } from '../shared/SpecialIconBlock';

import menuIconStyles from '../../../styles/menu/HeaderMenuIcon.module.scss';

function SearchBlockComponent({ item }: BlockProps) {
  return (
    <SpecialIconBlock
      item={item}
      fallbackIcon={<IconSearch {...HEADER_TABLER_ICON_PROPS} className={menuIconStyles.glyph} />}
    />
  );
}

export const SearchBlock = memo(SearchBlockComponent);
SearchBlock.displayName = 'SearchBlock';
