import type { DropdownTriggerProps } from '../../../types';

import { memo } from 'react';

import { isRenderableItem } from '../../../lib';
import { useSidebarTypePack } from '../../type';
import { Chevron } from '../Chevron/Chevron';

function DropdownTriggerComponent({ item, opened, onToggle }: DropdownTriggerProps) {
  const { Item, itemKind } = useSidebarTypePack();

  if (!isRenderableItem(item)) return null;

  if (itemKind === 'actionIcon') {
    return (
      <Item
        item={item}
        dropdownTrigger
        indicator={<Chevron opened={opened} />}
        onClick={onToggle}
        aria-expanded={opened}
        aria-haspopup="menu"
      />
    );
  }

  return (
    <Item
      item={item}
      dropdownTrigger
      onClick={onToggle}
      rightSection={<Chevron opened={opened} />}
      aria-expanded={opened}
      aria-haspopup="menu"
    />
  );
}

export const DropdownTrigger = memo(DropdownTriggerComponent);
DropdownTrigger.displayName = 'DropdownTrigger';
