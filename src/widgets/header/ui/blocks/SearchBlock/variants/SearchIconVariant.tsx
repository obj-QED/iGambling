import type { BlockProps } from '../../../../types';

import { memo } from 'react';

import { IconSearch } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';

import { normalizeAppPathname } from '@/shared/lib';

import { HEADER_TABLER_ICON_PROPS } from '../../../items/icons/iconProps';
import { SpecialIconBlock } from '../../shared/SpecialIconBlock';

function SearchIconVariantComponent({ item }: BlockProps) {
  const { pathname } = useLocation();
  const disabled = normalizeAppPathname(pathname) === '/profile';

  return (
    <SpecialIconBlock
      item={{ ...item, url: undefined }}
      fallbackIcon={<IconSearch {...HEADER_TABLER_ICON_PROPS} />}
      disabled={disabled}
    />
  );
}

export const SearchIconVariant = memo(SearchIconVariantComponent);
SearchIconVariant.displayName = 'SearchIconVariant';
