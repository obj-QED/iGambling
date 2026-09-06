import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { useSidebarTypePack } from '../../../context';

/** Compact footer row — same path as HeaderLink: pack Item (tooltip + ActionIcon). */
function CompactFooterLinkComponent({ item }: BlockProps) {
  const { Item } = useSidebarTypePack();
  return <Item item={item} chrome="footer" />;
}

export const CompactFooterLink = memo(CompactFooterLinkComponent);
CompactFooterLink.displayName = 'SidebarCompactFooterLink';
