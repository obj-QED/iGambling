import type { HeaderMenuItem } from '../../../types';

import { memo } from 'react';

import { Button } from '@mantine/core';

import { AppLink } from '@/shared/ui';

import { resolveButtonVariant } from '../../../lib/buttonVariant';
import { hasItemImg, hasItemName, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { HEADER_MENU_BUTTON_SIZE } from '../icons/iconProps';
import { ItemIcon } from '../ItemIcon/ItemIcon';

import styles from '../../../styles/menu/ItemButton.module.scss';

type ItemButtonProps = {
  item: HeaderMenuItem;
  rightSection?: React.ReactNode;
};

function ItemButtonComponent({ item, rightSection }: ItemButtonProps) {
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const variant = resolveButtonVariant(item.key);
  const leftSection =
    hasItemImg(item) === true ? <ItemIcon src={item.img ?? ''} alt={label} /> : undefined;

  return (
    <Button
      className={styles.root}
      component={AppLink}
      href={href}
      variant={variant}
      size={HEADER_MENU_BUTTON_SIZE}
      leftSection={leftSection}
      rightSection={rightSection}
      data-menu-key={item.key}
    >
      {hasItemName(item) === true ? item.name.trim() : null}
    </Button>
  );
}

export const ItemButton = memo(ItemButtonComponent);
ItemButton.displayName = 'ItemButton';
