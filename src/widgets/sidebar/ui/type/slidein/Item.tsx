import type { SidebarItemPresentationProps } from '../types';

import { memo } from 'react';

import { AppTooltip } from '@/shared/ui';

import { useSidebarConfig, useSidebarSlideout } from '../../../context';
import { ItemButton } from '../../items/ItemButton/ItemButton';

/**
 * Same row markup as `default` (`ItemButton`).
 * Tooltip only while collapsed (labels slide off left via CSS).
 */
function SlideinItemComponent(props: SidebarItemPresentationProps) {
  const { tooltip } = useSidebarConfig();
  const { expanded, enabled: expandOn } = useSidebarSlideout();
  const { chrome, item } = props;
  const tooltipConfig = expandOn && expanded ? { ...tooltip, enabled: false as const } : tooltip;

  return (
    <AppTooltip
      label={item.label}
      name={item.name}
      config={tooltipConfig}
      data-cmf-component={
        chrome === 'header' ? 'sidebar-header' : chrome === 'footer' ? 'sidebar-footer' : 'sidebar'
      }
      data-cmf-key="item"
    >
      <ItemButton {...props} />
    </AppTooltip>
  );
}

export const SlideinItem = memo(SlideinItemComponent);
SlideinItem.displayName = 'SidebarSlideinTypeItem';
