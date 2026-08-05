import type { SidebarItemPresentationProps } from '../types';

import { memo } from 'react';

import { ItemButton } from '../../items/ItemButton/ItemButton';

function DefaultItemComponent({
  item,
  className,
  dropdownItem,
  dropdownTrigger,
  chrome,
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
      chrome={chrome}
      rightSection={rightSection}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
    />
  );
}

export const DefaultItem = memo(DefaultItemComponent);
DefaultItem.displayName = 'SidebarDefaultTypeItem';
