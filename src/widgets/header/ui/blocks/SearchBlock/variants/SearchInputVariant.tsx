import type { BlockProps } from '../../../../types';

import { memo } from 'react';

import { IconSearch } from '@tabler/icons-react';

import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { SearchInputTrigger } from '@/shared/ui/AppSearch/ui/input';

import { useHeaderMenuSizes } from '../../../../context';
import { isRenderableItem, resolveHeaderMenuButtonSize, resolveItemLabel } from '../../../../lib';
import { HEADER_TABLER_ICON_PROPS } from '../../../items/icons/iconProps';

import styles from '../../../../styles/blocks/SearchInput.module.scss';

function SearchInputVariantComponent({
  item,
  onActivate,
  showHotkeyBadge,
  searchQuery,
  onSearchQueryChange,
}: BlockProps) {
  const menuSizes = useHeaderMenuSizes();

  if (!isRenderableItem(item)) return null;

  const label = resolveItemLabel(item);

  return (
    <SearchInputTrigger
      className={styles.root}
      placeholder={label}
      aria-label={label}
      size={resolveHeaderMenuButtonSize(item, menuSizes)}
      leftSection={<IconSearch {...HEADER_TABLER_ICON_PROPS} />}
      showHotkeyBadge={showHotkeyBadge}
      onActivate={onActivate}
      searchQuery={searchQuery}
      onSearchQueryChange={onSearchQueryChange}
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'header', key: 'search' }))}
      {...(onActivate !== undefined ? { 'data-search-overlay': 'true' } : {})}
    />
  );
}

export const SearchInputVariant = memo(SearchInputVariantComponent);
SearchInputVariant.displayName = 'SearchInputVariant';
export default SearchInputVariant;
