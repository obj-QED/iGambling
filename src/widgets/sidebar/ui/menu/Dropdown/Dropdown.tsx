import type { HeaderMenuItem } from '@/widgets/header';

import { memo, useCallback, useState } from 'react';

import { Collapse } from '@mantine/core';

import { useMenuItemRenderable } from '../../../hooks/useMenuItemRenderable';
import { isRenderableItem } from '../../../lib/itemUtils';
import { DropdownMenuItem } from '../DropdownMenuItem/DropdownMenuItem';
import { DropdownTrigger } from '../DropdownTrigger/DropdownTrigger';

import styles from '../../../styles/menu/Dropdown.module.scss';

type DropdownProps = {
  item: HeaderMenuItem;
};

function DropdownComponent({ item }: DropdownProps) {
  const [opened, setOpened] = useState(false);
  const { visible } = useMenuItemRenderable(item);
  const toggle = useCallback(() => {
    setOpened((current) => !current);
  }, []);

  if (isRenderableItem(item) === false || visible === false) return null;

  const children = item.items ?? [];
  if (children.length === 0) return null;

  return (
    <div className={styles.root} data-sidebar-dropdown>
      <DropdownTrigger item={item} opened={opened} onToggle={toggle} />
      <Collapse expanded={opened}>
        <ul className={styles.list} role="menu">
          {children.map((child) => (
            <DropdownMenuItem key={child.key} item={child} />
          ))}
        </ul>
      </Collapse>
    </div>
  );
}

export const Dropdown = memo(DropdownComponent);
Dropdown.displayName = 'Dropdown';
