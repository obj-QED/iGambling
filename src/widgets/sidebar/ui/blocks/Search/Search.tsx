import type { BlockProps } from '../../../types';

import { memo, useLayoutEffect } from 'react';

import { AdapterBoundary, LazyHost, preloadAdapters, useAdapter } from '@/shared/lib';
import { isCapabilityEnabled } from '@/shared/schema';
import { preloadSearchType, useAppSearchTrigger } from '@/shared/ui';

import { useSidebarConfig } from '../../../context';
import { SEARCH_ADAPTER_KEYS, SEARCH_ADAPTERS } from './adapters';

import styles from '../../../styles/blocks/SearchRow.module.scss';

/**
 * Aside search trigger (`search_leftmenu`) — opens global AppSearch.
 * `blockVariants.search`: `icon` → ActionIcon; `row` → TextInput slot.
 */
function SearchComponent({ item, className }: BlockProps) {
  const { blockVariants, behaviors, capabilities } = useSidebarConfig();
  const Adapter = useAdapter(SEARCH_ADAPTERS, blockVariants.search, SEARCH_ADAPTER_KEYS);
  const enabled = isCapabilityEnabled(capabilities, 'search');
  const { searchQuery, onActivate, onSearchQueryChange, showHotkeyBadge } = useAppSearchTrigger(
    behaviors.search,
  );

  useLayoutEffect(() => {
    if (!enabled) return;
    preloadAdapters(SEARCH_ADAPTERS, blockVariants.search, SEARCH_ADAPTER_KEYS);
    preloadSearchType(behaviors.search);
  }, [enabled, blockVariants.search, behaviors.search]);

  if (!enabled || !Adapter) return null;

  const isInputSlot = blockVariants.search === 'row';

  const host = (
    <span
      onPointerEnter={() => {
        preloadAdapters(SEARCH_ADAPTERS, blockVariants.search, SEARCH_ADAPTER_KEYS);
        preloadSearchType(behaviors.search);
      }}
    >
      <LazyHost
        component={Adapter}
        item={item}
        className={className}
        onActivate={onActivate}
        showHotkeyBadge={showHotkeyBadge}
        {...(onSearchQueryChange !== undefined ? { searchQuery, onSearchQueryChange } : {})}
      />
    </span>
  );

  if (isInputSlot) {
    return (
      <div className={styles.slot} data-search-slot="input">
        <AdapterBoundary>{host}</AdapterBoundary>
      </div>
    );
  }

  // Icon chrome — no width-100% slot wrapper (must match sibling ActionIcons).
  return <AdapterBoundary>{host}</AdapterBoundary>;
}

export const Search = memo(SearchComponent);
Search.displayName = 'SidebarSearch';
