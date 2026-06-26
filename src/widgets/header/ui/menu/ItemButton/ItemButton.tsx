import type { HeaderMenuItem } from '../../../types';

import { memo } from 'react';

import { Button } from '@mantine/core';

import { AppLink } from '@/shared/ui';

import {
  hasItemImg,
  hasItemName,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { resolveMenuItemButtonVariant } from '../../../lib/menuItemVariant';
import { HEADER_MENU_BUTTON_SIZE } from '../icons/iconProps';
import { MenuItemImage } from '../MenuItemImage/MenuItemImage';

import styles from '../../../styles/menu/ItemButton.module.scss';

type ItemButtonProps = {
  item: HeaderMenuItem;
  rightSection?: React.ReactNode;
};

function ItemButtonComponent({ item, rightSection }: ItemButtonProps) {
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const variant = resolveMenuItemButtonVariant(item);
  const leftSection =
    hasItemImg(item) === true ? <MenuItemImage item={item} alt={label} /> : undefined;

  return (
    <Button
      className={styles.root}
      component={AppLink}
      href={href}
      variant={variant}
      size={HEADER_MENU_BUTTON_SIZE}
      leftSection={leftSection}
      rightSection={rightSection}
      {...menuItemDataAttrs(item)}
    >
      {hasItemName(item) === true ? item.name.trim() : null}
    </Button>
  );
}

export const ItemButton = memo(ItemButtonComponent);
ItemButton.displayName = 'ItemButton';
