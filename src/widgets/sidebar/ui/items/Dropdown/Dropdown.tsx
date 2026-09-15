import type { DropdownProps } from '../../../types';

import { memo, useCallback } from 'react';

import { Collapse } from '@mantine/core';
import clsx from 'clsx';

import { useHasActiveNavDescendant } from '@/shared/hooks';

import { useSidebarDropdown } from '../../../context';
import { useMenuItemRenderable } from '../../../hooks';
import { isRenderableItem, itemKey } from '../../../lib';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';

import styles from '../../../styles/items/Dropdown.module.scss';

function DropdownComponent({ item, className }: DropdownProps) {
  const menuKey = itemKey(item);
  const { opened, toggle } = useSidebarDropdown(menuKey);
  const { visible } = useMenuItemRenderable(item);
  const children = item.items ?? [];
  const hasActiveChild = useHasActiveNavDescendant(children);

  const onToggle = useCallback(() => {
    toggle();
  }, [toggle]);

  if (!isRenderableItem(item) || !visible) return null;
  if (children.length === 0) return null;

  return (
    <div
      className={clsx(styles.root, className)}
      data-sidebar-dropdown
      {...(hasActiveChild ? { 'data-sidebar-dropdown-child-active': 'true' } : {})}
    >
      <DropdownTrigger item={item} opened={opened} onToggle={onToggle} />
      <Collapse expanded={opened} transitionDuration={500}>
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
