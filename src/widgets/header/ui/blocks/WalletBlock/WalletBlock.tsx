import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { Text } from '@mantine/core';

import {
  AdapterBoundary,
  LazyHost,
  preloadAdapters,
  preloadWrapper,
  useAdapter,
  useWrapper,
} from '@/shared/lib';
import { isCapabilityEnabled } from '@/shared/schema';

import { useConfig } from '../../../context';
import { resolveItemLabel } from '../../../lib';
import { WALLET_ADAPTER_KEYS, WALLET_ADAPTERS } from './adapters';

function WalletBlockComponent({ item }: BlockProps) {
  const { blockVariants, wrappers, capabilities } = useConfig();
  const Adapter = useAdapter(WALLET_ADAPTERS, blockVariants.wallet, WALLET_ADAPTER_KEYS);
  const wrapperMode = wrappers.wallet;
  const Wrapper = useWrapper(wrapperMode);
  const label = resolveItemLabel(item);
  const enabled = isCapabilityEnabled(capabilities, 'wallet');

  if (!enabled || !Adapter) return null;

  const warmSelected = () => {
    preloadAdapters(WALLET_ADAPTERS, blockVariants.wallet, WALLET_ADAPTER_KEYS);
    preloadWrapper(wrapperMode);
  };

  const adapterNode = <LazyHost component={Adapter} item={item} />;

  if (!wrapperMode || wrapperMode === 'none') {
    return (
      <AdapterBoundary>
        <span onPointerEnter={warmSelected}>{adapterNode}</span>
      </AdapterBoundary>
    );
  }

  return (
    <AdapterBoundary>
      <span onPointerEnter={warmSelected}>
        <LazyHost component={Wrapper} target={adapterNode} title={label}>
          <Text size="sm">{label}</Text>
        </LazyHost>
      </span>
    </AdapterBoundary>
  );
}

export const WalletBlock = memo(WalletBlockComponent);
WalletBlock.displayName = 'WalletBlock';
