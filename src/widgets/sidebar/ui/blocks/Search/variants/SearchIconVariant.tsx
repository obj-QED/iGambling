import type { BlockProps } from '../../../../types';

import { memo, useMemo } from 'react';

import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';

import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { SearchIconTrigger } from '@/shared/ui/AppSearch/ui/icon';
import { AppTooltip } from '@/shared/ui/AppTooltip';

import { useSidebarConfig } from '../../../../context';
import { useAsideMenuButtonSize } from '../../../../hooks';
import {
  isRenderableItem,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
} from '../../../../lib';

import searchIconStyles from '../../../../styles/blocks/SearchIcon.module.scss';
import itemActionIconStyles from '../../../../styles/items/ItemActionIcon.module.scss';

/**
 * Aside search `style: icon` — ActionIcon square matching menu button height.
 * Glyph only (`IconSearch`); no menu img / name initial.
 */
function SearchIconVariantComponent({
  item,
  className,
  onActivate,
  onSearchQueryChange,
}: BlockProps) {
  const { tooltip } = useSidebarConfig();
  const size = useAsideMenuButtonSize();
  const searchGlyph = useMemo(
    () => <IconSearch className="cmf-ActionIcon-icon-svg" stroke={1.5} aria-hidden />,
    [],
  );

  if (!isRenderableItem(item)) return null;

  const isAction = onActivate !== undefined || onSearchQueryChange !== undefined;
  const label = resolveItemLabel(item);
  const ariaLabel = label.length > 0 ? label : (item.name ?? 'Search');

  const control = (
    <SearchIconTrigger
      // No name/img — chrome is search glyph only.
      href={isAction ? undefined : resolveItemHref(item.url)}
      className={clsx(itemActionIconStyles.root, searchIconStyles.root, className)}
      variant={resolveMenuItemActionIconVariant(item)}
      size={size}
      aria-label={ariaLabel}
      active={isAction ? false : item.active}
      matchRoute={isAction ? false : item.matchRoute}
      activeMatch={item.activeMatch}
      onActivate={onActivate}
      onSearchQueryChange={onSearchQueryChange}
      {...controlAttrs(
        item,
        resolveCmfScope(item, { widget: 'sidebar', key: item.key ?? 'search_leftmenu' }),
      )}
    >
      {searchGlyph}
    </SearchIconTrigger>
  );

  return (
    <AppTooltip
      label={item.label}
      name={item.name}
      config={tooltip}
      data-cmf-component="sidebar"
      data-cmf-key="search"
    >
      {control}
    </AppTooltip>
  );
}

export const SearchIconVariant = memo(SearchIconVariantComponent);
SearchIconVariant.displayName = 'SidebarSearchIconVariant';
export default SearchIconVariant;
