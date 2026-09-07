import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { useSidebarTypePack } from '../../../context';

import headerStyles from '../../../styles/blocks/SidebarHeader.module.scss';

function SlideoutHeaderLinkComponent({ item }: BlockProps) {
  const { Item } = useSidebarTypePack();
  return <Item item={item} className={headerStyles.mainLinkCompact} chrome="header" />;
}

export const SlideoutHeaderLink = memo(SlideoutHeaderLinkComponent);
SlideoutHeaderLink.displayName = 'SidebarSlideoutHeaderLink';
