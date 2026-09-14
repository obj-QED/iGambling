import type { BlockProps } from '../../../../types';

import { memo } from 'react';

import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';

import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { SearchInputTrigger } from '@/shared/ui';

import { isRenderableItem, resolveItemLabel } from '../../../../lib';
import { SidebarExceptionButton } from '../../../items/SidebarExceptionButton/SidebarExceptionButton';

import styles from '../../../../styles/blocks/SearchRow.module.scss';

/** Default aside search row (full-width exception button or inline input). */
function SearchRowVariantComponent({
  item,
  className,
  onActivate,
  showHotkeyBadge,
  searchQuery,
  onSearchQueryChange,
}: BlockProps) {
  if (!isRenderableItem(item)) return null;

  const placeholder = item.name ?? 'Search';
  const label = resolveItemLabel(item);
  const ariaLabel = label.length > 0 ? label : placeholder;

  if (onSearchQueryChange !== undefined || onActivate !== undefined) {
    return (
      <SearchInputTrigger
        className={clsx(styles.root, className)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        leftSection={<IconSearch size={16} stroke={1.75} aria-hidden />}
        showHotkeyBadge={showHotkeyBadge}
        onActivate={onActivate}
        searchQuery={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        {...controlAttrs(item, resolveCmfScope(item, { widget: 'sidebar', key: 'search' }))}
        {...(onActivate !== undefined ? { 'data-search-overlay': 'true' } : {})}
      />
    );
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

export const SearchRowVariant = memo(SearchRowVariantComponent);
SearchRowVariant.displayName = 'SidebarSearchRowVariant';
export default SearchRowVariant;
