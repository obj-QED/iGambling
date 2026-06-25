import type { HeaderMenuItem } from '../../../types';

import { memo } from 'react';

import { Menu } from '@mantine/core';

import { AppLink } from '@/shared/ui';

import { hasItemImg, hasItemName, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { ItemIcon } from '../ItemIcon/ItemIcon';

type DropdownMenuItemProps = {
  item: HeaderMenuItem;
};

function DropdownMenuItemComponent({ item }: DropdownMenuItemProps) {
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const leftSection =
    hasItemImg(item) === true ? <ItemIcon src={item.img ?? ''} alt={label} /> : undefined;
  const content = hasItemName(item) === true ? item.name.trim() : label;

  if (href.length === 0) {
    return (
      <Menu.Item leftSection={leftSection} disabled data-menu-key={item.key}>
        {content}
      </Menu.Item>
    );
  }

  return (
    <Menu.Item component={AppLink} href={href} leftSection={leftSection} data-menu-key={item.key}>
      {content}
    </Menu.Item>
  );
}

export const DropdownMenuItem = memo(DropdownMenuItemComponent);
DropdownMenuItem.displayName = 'DropdownMenuItem';
