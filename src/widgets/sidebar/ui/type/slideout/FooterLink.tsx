import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { useSidebarTypePack } from '../../../context';

/** Slideout footer row — pack Item (tooltip + button with label clip). */
function SlideoutFooterLinkComponent({ item }: BlockProps) {
  const { Item } = useSidebarTypePack();
  return <Item item={item} chrome="footer" />;
}

export const SlideoutFooterLink = memo(SlideoutFooterLinkComponent);
SlideoutFooterLink.displayName = 'SidebarSlideoutFooterLink';
