import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { useSidebarTypePack } from '../../type';

import headerStyles from '../../../styles/blocks/SidebarHeader.module.scss';

function CompactHeaderLinkComponent({ item }: BlockProps) {
  const { Item } = useSidebarTypePack();
  return <Item item={item} className={headerStyles.mainLinkCompact} chrome="header" />;
}

export const CompactHeaderLink = memo(CompactHeaderLinkComponent);
CompactHeaderLink.displayName = 'SidebarCompactHeaderLink';
