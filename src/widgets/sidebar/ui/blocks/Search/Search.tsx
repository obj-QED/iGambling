import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { AdapterBoundary, LazyHost, useAdapter } from '@/shared/lib';
import { isCapabilityEnabled } from '@/shared/schema';
import { useAppSearchTrigger } from '@/shared/ui';

import { useSidebarConfig } from '../../../context';
import { SEARCH_ADAPTER_KEYS, SEARCH_ADAPTERS } from './adapters';

import styles from '../../../styles/blocks/SearchRow.module.scss';

/**
 * Aside search trigger (`search_leftmenu`) — opens global AppSearch.
 * Compact/slideout chrome via blockVariants.search (icon | row).
 */
function SearchComponent({ item, className }: BlockProps) {
  const { blockVariants, behaviors, capabilities } = useSidebarConfig();
  const Adapter = useAdapter(SEARCH_ADAPTERS, blockVariants.search, SEARCH_ADAPTER_KEYS);
  const enabled = isCapabilityEnabled(capabilities, 'search');
  const { searchQuery, onActivate, onSearchQueryChange, showHotkeyBadge } = useAppSearchTrigger(
    behaviors.search,
  );

  if (!enabled || !Adapter) return null;

  const isInputSlot = blockVariants.search === 'row';

  return (
    <div
      className={isInputSlot ? styles.slot : undefined}
      {...(isInputSlot ? { 'data-search-slot': 'input' } : {})}
    >
      <AdapterBoundary>
        <LazyHost
          component={Adapter}
          item={item}
          className={className}
          onActivate={onActivate}
          showHotkeyBadge={showHotkeyBadge}
          {...(onSearchQueryChange !== undefined ? { searchQuery, onSearchQueryChange } : {})}
        />
      </AdapterBoundary>
    </div>
  );
}

export const Search = memo(SearchComponent);
Search.displayName = 'SidebarSearch';
