import type { SidebarItemPresentationProps } from '../types';

import { memo } from 'react';

import { ItemButton } from '../../ui/items/ItemButton/ItemButton';

function DefaultItemComponent({
  item,
  className,
  dropdownItem,
  dropdownTrigger,
  rightSection,
  onClick,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHaspopup,
}: SidebarItemPresentationProps) {
  return (
    <ItemButton
      item={item}
      className={className}
      dropdownItem={dropdownItem}
      dropdownTrigger={dropdownTrigger}
      rightSection={rightSection}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
    />
  );
}

export const DefaultItem = memo(DefaultItemComponent);
DefaultItem.displayName = 'SidebarDefaultTypeItem';
