import type { BlockProps } from '../../../../types';

import { memo, useSyncExternalStore } from 'react';

import { IconSearch } from '@tabler/icons-react';

import { getPathname, normalizeAppPathname, subscribePathname } from '@/shared/lib';

import { HEADER_TABLER_ICON_PROPS } from '../../../items/icons/iconProps';
import { SpecialIconBlock } from '../../shared/SpecialIconBlock';

function isSearchDisabledOnPath(): boolean {
  return normalizeAppPathname(getPathname()) === '/profile';
}

function SearchIconVariantComponent({ item }: BlockProps) {
  const disabled = useSyncExternalStore(
    subscribePathname,
    isSearchDisabledOnPath,
    isSearchDisabledOnPath,
  );

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
export default SearchIconVariant;
