import type { HeaderMenuItem } from '@/widgets/header';

import { memo } from 'react';

import { isRenderableItem } from '../../../lib/itemUtils';
import { Chevron } from '../Chevron/Chevron';
import { ItemButton } from '../ItemButton/ItemButton';

type DropdownTriggerProps = {
  item: HeaderMenuItem;
  opened: boolean;
  onToggle: () => void;
};

function DropdownTriggerComponent({ item, opened, onToggle }: DropdownTriggerProps) {
  if (isRenderableItem(item) === false) return null;

  return (
    <ItemButton
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
