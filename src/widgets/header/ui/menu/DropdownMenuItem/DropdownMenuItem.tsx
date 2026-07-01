import type { HeaderMenuItem } from '../../../types';

import { memo } from 'react';

import { Menu } from '@mantine/core';

import { isValidAppHref } from '@/shared/lib';
import { AppLink } from '@/shared/ui';

import {
  hasItemImg,
  hasItemName,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { MenuItemImage } from '../MenuItemImage/MenuItemImage';

type DropdownMenuItemProps = {
  item: HeaderMenuItem;
};

function DropdownMenuItemComponent({ item }: DropdownMenuItemProps) {
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const leftSection =
    hasItemImg(item) === true ? <MenuItemImage item={item} alt={label} /> : undefined;
  const content = hasItemName(item) === true ? item.name : label;

  if (isValidAppHref(href) === false) {
    return (
      <Menu.Item leftSection={leftSection} disabled {...menuItemDataAttrs(item)}>
        {content}
      </Menu.Item>
    );
  }

  return (
    <Menu.Item
      component={AppLink}
      href={href}
      leftSection={leftSection}
      {...menuItemDataAttrs(item)}
    >
      {content}
    </Menu.Item>
  );
}

export const DropdownMenuItem = memo(DropdownMenuItemComponent);
DropdownMenuItem.displayName = 'DropdownMenuItem';
