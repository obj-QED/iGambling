import type { BlockProps } from '../../../types';

import { createElement, memo, useMemo } from 'react';

import { Text } from '@mantine/core';

import {
  AdapterBoundary,
  preloadAdapters,
  useAdapter,
  useWrapper,
} from '@/shared/lib/widgetAdapter';
import { isCapabilityEnabled } from '@/shared/schema';

import { useConfig } from '../../../context';
import { resolveItemLabel } from '../../../lib';
import { WALLET_ADAPTERS } from './adapters';

function WalletBlockComponent({ item }: BlockProps) {
  const { blockVariants, wrappers, capabilities } = useConfig();
  const Adapter = useAdapter(WALLET_ADAPTERS, blockVariants.wallet, ['compact', 'full']);
  const wrapperMode = wrappers.wallet;
  const Wrapper = useWrapper(wrapperMode);
  const label = useMemo(() => resolveItemLabel(item), [item]);
  const enabled = isCapabilityEnabled(capabilities, 'wallet');

  if (!enabled || !Adapter) return null;

  const adapterNode = createElement(Adapter, { item });

  if (!wrapperMode || wrapperMode === 'none') {
    return (
      <AdapterBoundary>
        <span
          onPointerEnter={() => {
            preloadAdapters(WALLET_ADAPTERS, 'compact');
          }}
        >
          {adapterNode}
        </span>
      </AdapterBoundary>
    );
  }

  return (
    <AdapterBoundary>
      {createElement(Wrapper, {
        target: adapterNode,
        title: label,
        children: <Text size="sm">{label}</Text>,
      })}
    </AdapterBoundary>
  );
}

export const WalletBlock = memo(WalletBlockComponent);
WalletBlock.displayName = 'WalletBlock';
