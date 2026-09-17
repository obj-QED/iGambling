import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { SidebarHeaderLink } from '../../blocks/SidebarHeader/HeaderLink';

/**
 * Expanded-face header rows — plain default chrome.
 * Collapsed compact face is a separate panel (`CompactHeaderLink` via type pack).
 */
function SlideinHeaderLinkComponent({ item }: BlockProps) {
  return <SidebarHeaderLink item={item} />;
}

export const SlideinHeaderLink = memo(SlideinHeaderLinkComponent);
SlideinHeaderLink.displayName = 'SidebarSlideinHeaderLink';
