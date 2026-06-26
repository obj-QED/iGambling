import type { HeaderMenuItem } from '../../../types';

import { forwardRef } from 'react';

import { ActionIcon, Button } from '@mantine/core';

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
import { HEADER_MENU_ACTION_ICON_SIZE, HEADER_MENU_BUTTON_SIZE } from '../icons/iconProps';
import { MenuItemImage } from '../MenuItemImage/MenuItemImage';

import styles from '../../../styles/menu/ItemMenuTrigger.module.scss';

type ItemMenuTriggerProps = {
  item: HeaderMenuItem;
  rightSection?: React.ReactNode;
};

const ItemMenuTriggerComponent = forwardRef<HTMLButtonElement, ItemMenuTriggerProps>(
  function ItemMenuTriggerComponent({ item, rightSection, ...rest }, ref) {
    if (isRenderableItem(item) === false) return null;

    const label = resolveItemLabel(item);

    if (isIconOnlyItem(item) === true && hasItemImg(item) === true) {
      return (
        <ActionIcon
          {...rest}
          ref={ref}
          className={styles.actionIcon}
          variant={resolveMenuItemActionIconVariant(item)}
          size={HEADER_MENU_ACTION_ICON_SIZE}
          aria-label={label}
          aria-haspopup="menu"
          {...menuItemDataAttrs(item)}
        >
          <MenuItemImage item={item} alt={label} />
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
        size={HEADER_MENU_BUTTON_SIZE}
        leftSection={leftSection}
        rightSection={rightSection}
        aria-label={label}
        aria-haspopup="menu"
        {...menuItemDataAttrs(item)}
      >
        {hasItemName(item) === true ? item.name.trim() : null}
      </Button>
    );
  },
);

export const ItemMenuTrigger = ItemMenuTriggerComponent;
ItemMenuTrigger.displayName = 'ItemMenuTrigger';
