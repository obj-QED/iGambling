import type { SidebarItemPresentationProps } from '../types';

import { memo } from 'react';

import { AppTooltip } from '@/shared/ui';

import { useSidebarConfig } from '../../../context';
import { ItemActionIcon } from '../../items/ItemActionIcon/ItemActionIcon';

function CompactItemComponent({
  item,
  className,
  dropdownItem,
  dropdownTrigger,
  indicator,
  onClick,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHaspopup,
}: SidebarItemPresentationProps) {
  const { tooltip } = useSidebarConfig();
  const control = (
    <ItemActionIcon
      item={item}
      className={className}
      dropdownItem={dropdownItem}
      dropdownTrigger={dropdownTrigger}
      indicator={indicator}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
    />
  );

  return (
    <AppTooltip
      label={item.label}
      name={item.name}
      config={tooltip}
      cmfComponent="sidebar"
      cmfKey="item"
    >
      {control}
    </AppTooltip>
  );
}

export const CompactItem = memo(CompactItemComponent);
CompactItem.displayName = 'SidebarCompactTypeItem';
