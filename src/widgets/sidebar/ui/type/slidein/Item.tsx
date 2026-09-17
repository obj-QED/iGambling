import type { SidebarItemPresentationProps } from '../types';

import { memo } from 'react';

import { AppTooltip } from '@/shared/ui';

import { useSidebarConfig } from '../../../context';
import { ItemButton } from '../../items/ItemButton/ItemButton';

/**
 * Expanded-face rows — labels stay visible (panel slides as a whole).
 * Tooltips off; collapsed face uses CompactItem tooltips.
 */
function SlideinItemComponent(props: SidebarItemPresentationProps) {
  const { tooltip } = useSidebarConfig();
  const { chrome, item } = props;
  const tooltipConfig = { ...tooltip, enabled: false as const };

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
