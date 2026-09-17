import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { SidebarFooterLink } from '../../blocks/SidebarFooter/FooterLink';

/**
 * Slidein footer — same button rows as `default` when expanded.
 * Collapse / compact chrome is handled by `SlideinType` CSS.
 */
function SlideinFooterLinkComponent({ item }: BlockProps) {
  return <SidebarFooterLink item={item} />;
}

export const SlideinFooterLink = memo(SlideinFooterLinkComponent);
SlideinFooterLink.displayName = 'SidebarSlideinFooterLink';
