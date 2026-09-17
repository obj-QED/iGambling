import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { IconUserScan } from '@tabler/icons-react';

import { useSidebarSlideout } from '../../../context';
import { itemKey } from '../../../lib';
import { SidebarHeaderLink } from '../../blocks/SidebarHeader/HeaderLink';

import headerStyles from '../../../styles/blocks/SidebarHeader.module.scss';

function isAccountHeaderItem(item: BlockProps['item']): boolean {
  const subtitle = item.subtitle;
  if (subtitle !== undefined && subtitle.length > 0) return true;
  return itemKey(item) === 'account';
}

/** Same header rows as `default`; settled collapsed account → `IconUserScan`. */
function SlideoutHeaderLinkComponent({ item }: BlockProps) {
  const { phase, settled } = useSidebarSlideout();
  const railAccount = phase === 'collapsed' && settled && isAccountHeaderItem(item);

  if (!railAccount) {
    return <SidebarHeaderLink item={item} />;
  }

  return (
    <SidebarHeaderLink
      item={item}
      leftSection={
        <IconUserScan className={headerStyles.mainLinkIcon} size={22} stroke={1.5} aria-hidden />
      }
    />
  );
}

export const SlideoutHeaderLink = memo(SlideoutHeaderLinkComponent);
SlideoutHeaderLink.displayName = 'SidebarSlideoutHeaderLink';
