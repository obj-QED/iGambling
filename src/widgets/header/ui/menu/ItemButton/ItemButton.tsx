import type { HeaderMenuItem } from '../../../types';

import { memo } from 'react';

import { Button } from '@mantine/core';

import { isValidAppHref } from '@/shared/lib';
import { AppLink } from '@/shared/ui';

import { useHeaderMenuSizes } from '../../../context/useHeaderMenuSizes';
import { resolveHeaderMenuButtonSize } from '../../../lib/headerMenuSize';
import {
  hasItemImg,
  hasItemName,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { resolveMenuItemButtonVariant } from '../../../lib/menuItemVariant';
import { MenuItemImage } from '../MenuItemImage/MenuItemImage';

import styles from '../../../styles/menu/ItemButton.module.scss';

type ItemButtonProps = {
  item: HeaderMenuItem;
  rightSection?: React.ReactNode;
};

function ItemButtonComponent({ item, rightSection }: ItemButtonProps) {
  const menuSizes = useHeaderMenuSizes();
  const href = resolveItemHref(item.url);
  const hrefDisabled = isValidAppHref(href) === false;
  const label = resolveItemLabel(item);
  const variant = resolveMenuItemButtonVariant(item);
  const size = resolveHeaderMenuButtonSize(item, menuSizes);
  const leftSection =
    hasItemImg(item) === true ? <MenuItemImage item={item} alt={label} /> : undefined;

  const sharedProps = {
    className: styles.root,
    variant,
    size,
    leftSection,
    rightSection,
    ...menuItemDataAttrs(item),
  };

  if (hrefDisabled) {
    return (
      <Button disabled {...sharedProps}>
        {hasItemName(item) === true ? item.name : null}
      </Button>
    );
  }

  return (
    <Button component={AppLink} href={href} {...sharedProps}>
      {hasItemName(item) === true ? item.name : null}
    </Button>
  );
}

export const ItemButton = memo(ItemButtonComponent);
ItemButton.displayName = 'ItemButton';
