import type { DropdownProps } from '../../../types';

import { memo } from 'react';

import { Menu } from '@mantine/core';

import { isRenderableItem } from '../../../lib/itemUtils';
import { Chevron } from '../Chevron/Chevron';
import { DropdownMenuItem } from '../DropdownMenuItem/DropdownMenuItem';
import { ItemMenuTrigger } from '../ItemMenuTrigger/ItemMenuTrigger';

import styles from '../../../styles/menu/Dropdown.module.scss';

function DropdownComponent({ item }: DropdownProps) {
  if (isRenderableItem(item) === false) return null;

  const children = item.items ?? [];
  if (children.length === 0) return null;

  return (
    <Menu withinPortal position="bottom-start" offset={4} loop={false} trapFocus={false}>
      <Menu.Target>
        <ItemMenuTrigger item={item} rightSection={<Chevron />} />
      </Menu.Target>
      <Menu.Dropdown className={styles.dropdown}>
        {children.map((child) => (
          <DropdownMenuItem key={child.key} item={child} />
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export const Dropdown = memo(DropdownComponent);
Dropdown.displayName = 'Dropdown';
