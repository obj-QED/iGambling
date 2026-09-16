import type { SidebarItemPresentationProps } from '../types';

import { memo } from 'react';

import { AppTooltip } from '@/shared/ui';

import { useSidebarConfig, useSidebarSlideout } from '../../../context';
import { ItemButton } from '../../items/ItemButton/ItemButton';

/**
 * Same row markup as `default` (`ItemButton`).
 * Tooltip only while collapsed (labels are CSS-hidden).
 */
function SlideoutItemComponent(props: SidebarItemPresentationProps) {
  const { tooltip } = useSidebarConfig();
  const { expanded, enabled: slideoutOn } = useSidebarSlideout();
  const { chrome, item } = props;
  const tooltipConfig = slideoutOn && expanded ? { ...tooltip, enabled: false as const } : tooltip;

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

export const SlideoutItem = memo(SlideoutItemComponent);
SlideoutItem.displayName = 'SidebarSlideoutTypeItem';
