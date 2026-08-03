import type { BlockProps } from '../../types';

import { memo } from 'react';

import { IconSearch } from '@tabler/icons-react';

import { AppActionIcon } from '@/elements';
import { AppTooltip } from '@/shared/ui';

import { useSidebarConfig } from '../../context';
import { useAsideMenuButtonSize } from '../../hooks';
import {
  hasItemName,
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
} from '../../lib';

function SearchComponent({ item, className }: BlockProps) {
  const { tooltip } = useSidebarConfig();
  const size = useAsideMenuButtonSize();

  if (!isRenderableItem(item)) return null;

  const placeholder = item.name ?? 'Search';
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const ariaLabel = label.length > 0 ? label : placeholder;

  const control = (
    <AppActionIcon
      name={item.name}
      img={item.img}
      href={href}
      className={className}
      variant={resolveMenuItemActionIconVariant(item)}
      size={size}
      aria-label={ariaLabel}
      {...menuItemDataAttrs(item)}
    >
      <IconSearch className="cmf-ActionIcon-icon-svg" stroke={1.75} aria-hidden />
    </AppActionIcon>
  );

  if (!hasItemName(item)) return control;

  return (
    <AppTooltip label={ariaLabel} config={tooltip} cmfComponent="sidebar" cmfKey="search">
      {control}
    </AppTooltip>
  );
}

export const Search = memo(SearchComponent);
Search.displayName = 'SidebarSearch';
