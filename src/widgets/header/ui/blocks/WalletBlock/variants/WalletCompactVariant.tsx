import type { BlockProps } from '../../../../types';

import { memo } from 'react';

import { IconWallet } from '@tabler/icons-react';

import { HEADER_TABLER_ICON_PROPS } from '../../../items/icons/iconProps';
import { SpecialIconBlock } from '../../shared/SpecialIconBlock';

function WalletCompactVariantComponent({ item }: BlockProps) {
  return (
    <SpecialIconBlock
      item={item}
      fallbackIcon={<IconWallet {...HEADER_TABLER_ICON_PROPS} />}
      disabled={false}
    />
  );
}

export const WalletCompactVariant = memo(WalletCompactVariantComponent);
WalletCompactVariant.displayName = 'WalletCompactVariant';
