import type { HeaderMenuItem } from '../../../types';

import { forwardRef } from 'react';

import { ActionIcon, Button } from '@mantine/core';

import { useHeaderMenuSizes } from '../../../context/useHeaderMenuSizes';
import {
  resolveHeaderMenuActionIconSize,
  resolveHeaderMenuButtonSize,
} from '../../../lib/headerMenuSize';
import {
  hasItemImg,
  hasItemName,
  isIconOnlyItem,
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import {
  resolveMenuItemActionIconVariant,
  resolveMenuItemButtonVariant,
} from '../../../lib/menuItemVariant';
import { MenuItemImage } from '../MenuItemImage/MenuItemImage';

import styles from '../../../styles/menu/ItemMenuTrigger.module.scss';

type ItemMenuTriggerProps = {
  item: HeaderMenuItem;
  rightSection?: React.ReactNode;
};

const ItemMenuTriggerComponent = forwardRef<HTMLButtonElement, ItemMenuTriggerProps>(
  function ItemMenuTriggerComponent({ item, rightSection, ...rest }, ref) {
    if (isRenderableItem(item) === false) return null;

    const menuSizes = useHeaderMenuSizes();
    const label = resolveItemLabel(item);
    const actionIconSize = resolveHeaderMenuActionIconSize(menuSizes);
    const buttonSize = resolveHeaderMenuButtonSize(item, menuSizes);

    if (isIconOnlyItem(item) === true && hasItemImg(item) === true) {
      return (
        <ActionIcon
          {...rest}
          ref={ref}
          className={styles.actionIcon}
          variant={resolveMenuItemActionIconVariant(item)}
          size={actionIconSize}
          aria-label={label}
          aria-haspopup="menu"
          {...menuItemDataAttrs(item)}
        >
          <MenuItemImage item={item} alt={label} inActionIcon />
        </ActionIcon>
      );
    }

    const leftSection =
      hasItemImg(item) === true ? <MenuItemImage item={item} alt={label} /> : undefined;

    return (
      <Button
        {...rest}
        ref={ref}
        className={styles.button}
        variant={resolveMenuItemButtonVariant(item)}
        size={buttonSize}
        leftSection={leftSection}
        rightSection={rightSection}
        aria-label={label}
        aria-haspopup="menu"
        {...menuItemDataAttrs(item)}
      >
        {hasItemName(item) === true ? item.name : null}
      </Button>
    );
  },
);

export const ItemMenuTrigger = ItemMenuTriggerComponent;
ItemMenuTrigger.displayName = 'ItemMenuTrigger';
