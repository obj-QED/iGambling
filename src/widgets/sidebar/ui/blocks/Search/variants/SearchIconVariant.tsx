import type { BlockProps } from '../../../../types';

import { memo, useMemo } from 'react';

import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';

import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { AppActionIcon } from '@/shared/ui';
import { AppTooltip } from '@/shared/ui';

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
 * Compact rail search — same ActionIcon chrome as siblings (`ItemActionIcon` styles),
 * with Tabler search glyph (menu `img` is often empty).
 */
function SearchIconVariantComponent({ item, className }: BlockProps) {
  const { tooltip } = useSidebarConfig();
  const size = useAsideMenuButtonSize();
  const searchGlyph = useMemo(
    () => <IconSearch className="cmf-ActionIcon-icon-svg" stroke={1.75} aria-hidden />,
    [],
  );

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
      className={clsx(itemActionIconStyles.root, className)}
      variant={resolveMenuItemActionIconVariant(item)}
      size={size}
      aria-label={ariaLabel}
      active={item.active}
      matchRoute={item.matchRoute}
      activeMatch={item.activeMatch}
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'sidebar' }))}
    >
      {searchGlyph}
    </AppActionIcon>
  );

  if (!hasItemName(item)) return control;

  return (
    <AppTooltip
      label={item.label}
      name={item.name}
      config={tooltip}
      cmfComponent="sidebar"
      cmfKey="search"
    >
      {control}
    </AppTooltip>
  );
}

export const SearchIconVariant = memo(SearchIconVariantComponent);
SearchIconVariant.displayName = 'SidebarSearchIconVariant';
