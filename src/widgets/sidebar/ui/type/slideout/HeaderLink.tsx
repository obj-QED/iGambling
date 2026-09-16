import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { SidebarHeaderLink } from '../../blocks/SidebarHeader/HeaderLink';

/** Same header rows as `default` — collapse is CSS-only on the shared Button markup. */
function SlideoutHeaderLinkComponent({ item }: BlockProps) {
  return <SidebarHeaderLink item={item} />;
}

export const SlideoutHeaderLink = memo(SlideoutHeaderLinkComponent);
SlideoutHeaderLink.displayName = 'SidebarSlideoutHeaderLink';
