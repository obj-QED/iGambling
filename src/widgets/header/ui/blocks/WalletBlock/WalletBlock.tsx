import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { IconWallet } from '@tabler/icons-react';

import { HEADER_TABLER_ICON_PROPS } from '../../menu/icons/iconProps';
import { SpecialIconBlock } from '../shared/SpecialIconBlock';

import menuIconStyles from '../../../styles/menu/HeaderMenuIcon.module.scss';

function WalletBlockComponent({ item }: BlockProps) {
  return (
    <SpecialIconBlock
      item={item}
      fallbackIcon={<IconWallet {...HEADER_TABLER_ICON_PROPS} className={menuIconStyles.glyph} />}
    />
  );
}

export const WalletBlock = memo(WalletBlockComponent);
WalletBlock.displayName = 'WalletBlock';
