import type { HeaderMenuItem } from '../../../types';

import { forwardRef } from 'react';

import { ActionIcon, Button } from '@mantine/core';

import { resolveButtonVariant } from '../../../lib/buttonVariant';
import {
  hasItemImg,
  hasItemName,
  isIconOnlyItem,
  isRenderableItem,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { HEADER_MENU_ACTION_ICON_SIZE, HEADER_MENU_BUTTON_SIZE } from '../icons/iconProps';
import { ItemIcon } from '../ItemIcon/ItemIcon';

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
          variant="default"
          size={HEADER_MENU_ACTION_ICON_SIZE}
          aria-label={label}
          aria-haspopup="menu"
          data-menu-key={item.key}
        >
          <ItemIcon src={item.img ?? ''} alt={label} />
        </ActionIcon>
      );
    }

    const leftSection =
      hasItemImg(item) === true ? <ItemIcon src={item.img ?? ''} alt={label} /> : undefined;

    return (
      <Button
        {...rest}
        ref={ref}
        className={styles.button}
        variant={resolveButtonVariant(item.key)}
        size={HEADER_MENU_BUTTON_SIZE}
        leftSection={leftSection}
        rightSection={rightSection}
        aria-label={label}
        aria-haspopup="menu"
        data-menu-key={item.key}
      >
        {hasItemName(item) === true ? item.name.trim() : null}
      </Button>
    );
  },
);

export const ItemMenuTrigger = ItemMenuTriggerComponent;
ItemMenuTrigger.displayName = 'ItemMenuTrigger';
