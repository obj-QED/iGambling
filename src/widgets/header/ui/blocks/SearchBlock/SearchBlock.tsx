import type { BlockProps } from '../../../types';

import { memo, useMemo } from 'react';

import { TextInput } from '@mantine/core';

import { isCapabilityEnabled } from '@/shared/schema';

import { useConfig } from '../../../context';
import { resolveItemLabel } from '../../../lib';
import { pluginRegistry } from '../../../plugins';
import { HeaderAdapterBoundary, preloadPlugin, useAdapter, useWrapper } from '../../../runtime';

function SearchBlockComponent({ item }: BlockProps) {
  const { blockVariants, wrappers, capabilities } = useConfig();
  const plugin = pluginRegistry.search;
  const Adapter = useAdapter(plugin, blockVariants.search);
  const wrapperMode = wrappers.search;
  const Wrapper = useWrapper(wrapperMode);
  const label = useMemo(() => resolveItemLabel(item), [item]);
  const enabled = isCapabilityEnabled(capabilities, 'search');

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
        <TextInput placeholder={label} aria-label={label} />
      </Wrapper>
    </HeaderAdapterBoundary>
  );
}

export const SearchBlock = memo(SearchBlockComponent);
SearchBlock.displayName = 'SearchBlock';
