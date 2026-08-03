import type { DropdownItemProps } from '../../../types';

import { memo } from 'react';

import { useMenuItemRenderable } from '../../../hooks';
import { isRenderableItem } from '../../../lib';
import { useSidebarTypePack } from '../../../typePacks';

import styles from '../../../styles/items/DropdownItem.module.scss';

function DropdownItemComponent({ item }: DropdownItemProps) {
  const { Item } = useSidebarTypePack();
  const { visible } = useMenuItemRenderable(item);

  if (!isRenderableItem(item) || !visible) return null;

  return (
    <li className={styles.item} role="none">
      <Item item={item} dropdownItem />
    </li>
  );
}

export const DropdownItem = memo(DropdownItemComponent);
DropdownItem.displayName = 'DropdownItem';
