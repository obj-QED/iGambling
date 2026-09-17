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

/** Same header rows as `default`; collapsed account → `IconUserScan`, no chevron. */
function SlideoutHeaderLinkComponent({ item }: BlockProps) {
  const { phase, settled } = useSidebarSlideout();
  const isAccount = isAccountHeaderItem(item);
  const rail = phase === 'collapsed' || phase === 'collapsing';
  const railAccount = phase === 'collapsed' && settled && isAccount;

  return (
    <SidebarHeaderLink
      item={item}
      hideRightSection={rail && isAccount}
      railIconOnly={railAccount}
      leftSection={
        railAccount ? (
          <IconUserScan className={headerStyles.mainLinkIcon} size={22} stroke={1.5} aria-hidden />
        ) : undefined
      }
    />
  );
}

export const SlideoutHeaderLink = memo(SlideoutHeaderLinkComponent);
SlideoutHeaderLink.displayName = 'SidebarSlideoutHeaderLink';
