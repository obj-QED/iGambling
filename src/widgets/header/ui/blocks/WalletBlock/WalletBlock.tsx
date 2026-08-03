import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { useConfig } from '../../../context';
import { resolveWalletVariantComponent } from './registry';

function WalletBlockComponent({ item }: BlockProps) {
  const { blockVariants } = useConfig();
  const Variant = resolveWalletVariantComponent(blockVariants.wallet);
  return <Variant item={item} />;
}

export const WalletBlock = memo(WalletBlockComponent);
WalletBlock.displayName = 'WalletBlock';
