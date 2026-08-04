import type { BlockProps } from '../../../types';

import { memo, useMemo } from 'react';

import { Text } from '@mantine/core';

import { isCapabilityEnabled } from '@/shared/schema';

import { useConfig } from '../../../context';
import { resolveItemLabel } from '../../../lib';
import { pluginRegistry } from '../../../plugins';
import { HeaderAdapterBoundary, preloadPlugin, useAdapter, useWrapper } from '../../../runtime';

function WalletBlockComponent({ item }: BlockProps) {
  const { blockVariants, wrappers, capabilities } = useConfig();
  const plugin = pluginRegistry.wallet;
  const Adapter = useAdapter(plugin, blockVariants.wallet);
  const wrapperMode = wrappers.wallet;
  const Wrapper = useWrapper(wrapperMode);
  const label = useMemo(() => resolveItemLabel(item), [item]);
  const enabled = isCapabilityEnabled(capabilities, 'wallet');

  if (!enabled || !Adapter) return null;

  const adapterNode = <Adapter item={item} />;

  if (!wrapperMode || wrapperMode === 'none') {
    return (
      <HeaderAdapterBoundary>
        <span
          onPointerEnter={() => {
            preloadPlugin(plugin);
          }}
        >
          {adapterNode}
        </span>
      </HeaderAdapterBoundary>
    );
  }

  return (
    <HeaderAdapterBoundary>
      <Wrapper target={adapterNode} title={label}>
        <Text size="sm">{label}</Text>
      </Wrapper>
    </HeaderAdapterBoundary>
  );
}

export const WalletBlock = memo(WalletBlockComponent);
WalletBlock.displayName = 'WalletBlock';
