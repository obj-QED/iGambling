import type { BlockProps } from '../../../../types';

import { memo, useSyncExternalStore } from 'react';

import { IconSearch } from '@tabler/icons-react';

import {
  controlAttrs,
  getPathname,
  normalizeAppPathname,
  resolveCmfScope,
  subscribePathname,
} from '@/shared/lib';
import { SearchIconTrigger } from '@/shared/ui';

import { useHeaderMenuSizes } from '../../../../context';
import {
  isRenderableItem,
  resolveHeaderMenuActionIconSize,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
} from '../../../../lib';
import { HEADER_TABLER_ICON_PROPS } from '../../../items/icons/iconProps';
import { HeaderActionIconTooltip } from '../../../shared/HeaderActionIconTooltip';

function isSearchDisabledOnPath(): boolean {
  return normalizeAppPathname(getPathname()) === '/profile';
}

function SearchIconVariantComponent({ item, onActivate, onSearchQueryChange }: BlockProps) {
  const menuSizes = useHeaderMenuSizes();
  const disabled = useSyncExternalStore(
    subscribePathname,
    isSearchDisabledOnPath,
    isSearchDisabledOnPath,
  );

  if (!isRenderableItem(item)) return null;

  const label = resolveItemLabel(item);

  return (
    <HeaderActionIconTooltip item={item}>
      <SearchIconTrigger
        name={item.name}
        img={item.img}
        variant={resolveMenuItemActionIconVariant(item)}
        size={resolveHeaderMenuActionIconSize(menuSizes)}
        aria-label={label}
        disabled={disabled}
        onActivate={onActivate}
        onSearchQueryChange={onSearchQueryChange}
        {...controlAttrs(item, resolveCmfScope(item, { widget: 'header', key: 'search' }))}
      >
        <IconSearch {...HEADER_TABLER_ICON_PROPS} />
      </SearchIconTrigger>
    </HeaderActionIconTooltip>
  );
}

export const SearchIconVariant = memo(SearchIconVariantComponent);
SearchIconVariant.displayName = 'SearchIconVariant';
export default SearchIconVariant;
