import type { DropdownProps } from '../../../types';

import { memo, useCallback } from 'react';

import { Collapse } from '@mantine/core';
import clsx from 'clsx';

import { useSidebarDropdown } from '../../../context';
import { useMenuItemRenderable } from '../../../hooks';
import { isRenderableItem, itemKey } from '../../../lib';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import { DropdownTrigger } from '../DropdownTrigger/DropdownTrigger';

import styles from '../../../styles/items/Dropdown.module.scss';

function DropdownComponent({ item, className }: DropdownProps) {
  const menuKey = itemKey(item);
  const { isOpen, toggle } = useSidebarDropdown();
  const opened = isOpen(menuKey);

  const { visible } = useMenuItemRenderable(item);

  const onToggle = useCallback(() => {
    toggle(menuKey);
  }, [menuKey, toggle]);

  if (!isRenderableItem(item) || !visible) return null;

  const children = item.items ?? [];
  if (children.length === 0) return null;

  return (
    <div className={clsx(styles.root, className)} data-sidebar-dropdown>
      <DropdownTrigger item={item} opened={opened} onToggle={onToggle} />
      <Collapse expanded={opened}>
        <ul className={styles.list} role="menu">
          {children.map((child) => (
            <DropdownItem key={child.key} item={child} />
          ))}
        </ul>
      </Collapse>
    </div>
  );
}

export const Dropdown = memo(DropdownComponent);
Dropdown.displayName = 'Dropdown';
