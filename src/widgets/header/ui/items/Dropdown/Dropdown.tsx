import type { DropdownProps } from '../../../types';

import { memo } from 'react';

import { Menu } from '@mantine/core';

import { isRenderableItem } from '../../../lib';
import { Chevron } from '../Chevron/Chevron';
import { DropdownItem } from './DropdownItem';
import { ItemDropdownTrigger } from './ItemDropdownTrigger';

import styles from '../../../styles/items/Dropdown.module.scss';

function DropdownComponent({ item }: DropdownProps) {
  if (!isRenderableItem(item)) return null;

  const children = item.items ?? [];
  if (children.length === 0) return null;

  return (
    <Menu withinPortal position="bottom-start" offset={4} loop={false} trapFocus={false}>
      <Menu.Target>
        <ItemDropdownTrigger item={item} rightSection={<Chevron />} />
      </Menu.Target>
      <Menu.Dropdown className={styles.dropdown}>
        {children.map((child) => (
          <DropdownItem key={child.key} item={child} />
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export const Dropdown = memo(DropdownComponent);
Dropdown.displayName = 'Dropdown';
