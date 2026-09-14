import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { AdapterBoundary, LazyHost, preloadAdapters, useAdapter } from '@/shared/lib';
import { isCapabilityEnabled } from '@/shared/schema';
import { useAppSearchTrigger } from '@/shared/ui';

import { useConfig } from '../../../context';
import { SEARCH_ADAPTER_KEYS, SEARCH_ADAPTERS } from './adapters';

import styles from '../../../styles/blocks/SearchInput.module.scss';

/** Header search trigger — opens global AppSearch (modal / spotlight / input). */
function SearchBlockComponent({ item }: BlockProps) {
  const { blockVariants, behaviors, capabilities } = useConfig();
  const Adapter = useAdapter(SEARCH_ADAPTERS, blockVariants.search, SEARCH_ADAPTER_KEYS);
  const enabled = isCapabilityEnabled(capabilities, 'search');
  const { searchQuery, onActivate, onSearchQueryChange, showHotkeyBadge } = useAppSearchTrigger(
    behaviors.search,
  );

  if (!enabled || !Adapter) return null;

  const isInputSlot = blockVariants.search === 'input';

  return (
    <div
      className={isInputSlot ? styles.slot : undefined}
      {...(isInputSlot ? { 'data-search-slot': 'input' } : {})}
    >
      <AdapterBoundary>
        <span
          onPointerEnter={() => {
            preloadAdapters(SEARCH_ADAPTERS, 'compact');
          }}
        >
          <LazyHost
            component={Adapter}
            item={item}
            onActivate={onActivate}
            showHotkeyBadge={showHotkeyBadge}
            {...(onSearchQueryChange !== undefined ? { searchQuery, onSearchQueryChange } : {})}
          />
        </span>
      </AdapterBoundary>
    </div>
  );
}

export const SearchBlock = memo(SearchBlockComponent);
SearchBlock.displayName = 'SearchBlock';
