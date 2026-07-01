import type { DropdownMenuItemProps } from '../../../types';

import { memo } from 'react';

import { useMenuItemRenderable } from '../../../hooks/useMenuItemRenderable';
import { isRenderableItem } from '../../../lib/itemUtils';
import { ItemButton } from '../ItemButton/ItemButton';

import styles from '../../../styles/menu/DropdownMenuItem.module.scss';

function DropdownMenuItemComponent({ item }: DropdownMenuItemProps) {
  const { visible } = useMenuItemRenderable(item);

  if (isRenderableItem(item) === false || visible === false) return null;

  return (
    <li className={styles.item} role="none">
      <ItemButton item={item} dropdownItem />
    </li>
  );
}

export const DropdownMenuItem = memo(DropdownMenuItemComponent);
DropdownMenuItem.displayName = 'DropdownMenuItem';
