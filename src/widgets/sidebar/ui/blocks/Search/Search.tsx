import type { BlockProps } from '../../../types';

import { createElement, memo } from 'react';

import {
  AdapterBoundary,
  preloadAdapters,
  useAdapter,
  useWrapper,
} from '@/shared/lib/widgetAdapter';
import { isCapabilityEnabled } from '@/shared/schema';

import { useSidebarConfig } from '../../../context';
import { resolveItemLabel } from '../../../lib';
import { SEARCH_ADAPTERS } from './adapters';

/**
 * Sync search block router.
 * Compact: typePack.blocks.search_leftmenu → SearchIconVariant (sync).
 */
function SearchComponent({ item, className }: BlockProps) {
  const { blockVariants, wrappers, capabilities } = useSidebarConfig();
  const Adapter = useAdapter(SEARCH_ADAPTERS, blockVariants.search ?? 'row', ['row', 'icon']);
  const wrapperMode = wrappers.search;
  const Wrapper = useWrapper(wrapperMode);
  const label = resolveItemLabel(item);
  const enabled = isCapabilityEnabled(capabilities, 'search');

  if (!enabled || !Adapter) return null;

  const adapterNode = createElement(Adapter, { item, className });

  if (!wrapperMode || wrapperMode === 'none') {
    return (
      <AdapterBoundary>
        <span
          onPointerEnter={() => {
            preloadAdapters(SEARCH_ADAPTERS, 'row');
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
        title: label.length > 0 ? label : (item.name ?? 'Search'),
        children: adapterNode,
      })}
    </AdapterBoundary>
  );
}

export const Search = memo(SearchComponent);
Search.displayName = 'SidebarSearch';
