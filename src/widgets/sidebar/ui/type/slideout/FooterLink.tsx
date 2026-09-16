import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { SidebarFooterLink } from '../../blocks/SidebarFooter/FooterLink';

/**
 * Slideout footer — same button rows as `default` when expanded.
 * Collapse / rail chrome is handled by `SlideoutType` CSS.
 */
function SlideoutFooterLinkComponent({ item }: BlockProps) {
  return <SidebarFooterLink item={item} />;
}

export const SlideoutFooterLink = memo(SlideoutFooterLinkComponent);
SlideoutFooterLink.displayName = 'SidebarSlideoutFooterLink';
