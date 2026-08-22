import type { BlockProps } from '../../../types';

import { createElement, memo, useMemo } from 'react';

import { TextInput } from '@mantine/core';

import { AdapterBoundary, preloadAdapters, useAdapter, useWrapper } from '@/shared/lib';
import { isCapabilityEnabled } from '@/shared/schema';

import { useConfig } from '../../../context';
import { resolveItemLabel } from '../../../lib';
import { SEARCH_ADAPTER_KEYS, SEARCH_ADAPTERS } from './adapters';

function SearchBlockComponent({ item }: BlockProps) {
  const { blockVariants, wrappers, capabilities } = useConfig();
  const Adapter = useAdapter(SEARCH_ADAPTERS, blockVariants.search, SEARCH_ADAPTER_KEYS);
  const wrapperMode = wrappers.search;
  const Wrapper = useWrapper(wrapperMode);
  const label = useMemo(() => resolveItemLabel(item), [item]);
  const enabled = isCapabilityEnabled(capabilities, 'search');

  if (!enabled || !Adapter) return null;

  const adapterNode = createElement(Adapter, { item });

  if (!wrapperMode || wrapperMode === 'none') {
    return (
      <AdapterBoundary>
        <span
          onPointerEnter={() => {
            preloadAdapters(SEARCH_ADAPTERS, 'compact');
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
        children: <TextInput placeholder={label} aria-label={label} />,
      })}
    </AdapterBoundary>
  );
}

export const SearchBlock = memo(SearchBlockComponent);
SearchBlock.displayName = 'SearchBlock';
