import type { BlockProps } from '../../types';

import { memo } from 'react';

import { useSidebarTypePack } from '../useSidebarTypePack';

import headerStyles from '../../styles/layout/SidebarHeader.module.scss';

function CompactHeaderLinkComponent({ item }: BlockProps) {
  const { Item } = useSidebarTypePack();
  return <Item item={item} className={headerStyles.mainLinkCompact} />;
}

export const CompactHeaderLink = memo(CompactHeaderLinkComponent);
CompactHeaderLink.displayName = 'SidebarCompactHeaderLink';
