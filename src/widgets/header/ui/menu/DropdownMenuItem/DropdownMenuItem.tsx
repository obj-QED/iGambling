import type { DropdownMenuItemProps } from '../../../types';

import { memo } from 'react';

import { Menu } from '@mantine/core';

import { useMenuItemMediaState } from '@/shared/hooks/useMenuItemMediaState';
import { isValidAppHref } from '@/shared/lib';
import { AppLink } from '@/shared/ui';

import { menuItemDataAttrs, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { MenuItemImage } from '../MenuItemImage/MenuItemImage';

function DropdownMenuItemComponent({ item }: DropdownMenuItemProps) {
  const { onImgError, showItemImg, iconControlAttrs } = useMenuItemMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const leftSection = showItemImg ? (
    <MenuItemImage item={item} alt={label} onImgFailed={onImgError} />
  ) : undefined;
  const content = item?.name ?? label;
  const menuItemProps = {
    leftSection,
    ...menuItemDataAttrs(item),
    ...iconControlAttrs,
  };

  if (isValidAppHref(href) === false) {
    return (
      <Menu.Item disabled {...menuItemProps}>
        {content}
      </Menu.Item>
    );
  }

  return (
    <Menu.Item component={AppLink} href={href} {...menuItemProps}>
      {content}
    </Menu.Item>
  );
}

export const DropdownMenuItem = memo(DropdownMenuItemComponent);
DropdownMenuItem.displayName = 'DropdownMenuItem';
