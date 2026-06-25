import type { HeaderMenuItem } from '../../../types';

import { memo } from 'react';

import { ActionIcon } from '@mantine/core';

import { AppLink } from '@/shared/ui';

import { hasItemImg, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { HEADER_MENU_ACTION_ICON_SIZE } from '../icons/iconProps';
import { ItemIcon } from '../ItemIcon/ItemIcon';

import styles from '../../../styles/menu/ItemActionIcon.module.scss';

type ItemActionIconProps = {
  item: HeaderMenuItem;
};

function ItemActionIconComponent({ item }: ItemActionIconProps) {
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);

  return (
    <ActionIcon
      className={styles.root}
      component={AppLink}
      href={href}
      variant="default"
      size={HEADER_MENU_ACTION_ICON_SIZE}
      aria-label={label}
      data-menu-key={item.key}
    >
      {hasItemImg(item) === true ? (
        <ItemIcon src={item.img ?? ''} alt={label} />
      ) : (
        label.slice(0, 1).toUpperCase()
      )}
    </ActionIcon>
  );
}

export const ItemActionIcon = memo(ItemActionIconComponent);
ItemActionIcon.displayName = 'ItemActionIcon';
