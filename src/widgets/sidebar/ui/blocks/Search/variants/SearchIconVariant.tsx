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
  hasItemName,
  isRenderableItem,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
} from '../../../../lib';

import itemActionIconStyles from '../../../../styles/items/ItemActionIcon.module.scss';

/**
 * Compact rail search — ActionIcon chrome via shared SearchIconTrigger.
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
    () => <IconSearch className="cmf-ActionIcon-icon-svg" stroke={1.75} aria-hidden />,
    [],
  );

  if (!isRenderableItem(item)) return null;

  const isAction = onActivate !== undefined || onSearchQueryChange !== undefined;
  const placeholder = item.name ?? 'Search';
  const href = isAction ? undefined : resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const ariaLabel = label.length > 0 ? label : placeholder;

  const control = (
    <SearchIconTrigger
      name={item.name}
      img={item.img}
      href={href}
      className={clsx(itemActionIconStyles.root, className)}
      variant={resolveMenuItemActionIconVariant(item)}
      size={size}
      aria-label={ariaLabel}
      active={isAction ? false : item.active}
      matchRoute={isAction ? false : item.matchRoute}
      activeMatch={item.activeMatch}
      onActivate={onActivate}
      onSearchQueryChange={onSearchQueryChange}
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'sidebar', key: 'search' }))}
    >
      {searchGlyph}
    </SearchIconTrigger>
  );

  if (!hasItemName(item)) return control;

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
