import type { BlockProps } from '../../../types';

import { memo, useCallback, useLayoutEffect } from 'react';

import { AdapterBoundary, LazyHost, preloadAdapters, useAdapter } from '@/shared/lib';
import { isCapabilityEnabled } from '@/shared/schema';
import { preloadSearchType, useAppSearchTrigger } from '@/shared/ui';

import { useSidebarConfig, useSidebarSlideout } from '../../../context';
import { SEARCH_ADAPTER_KEYS, SEARCH_ADAPTERS } from './adapters';

import styles from '../../../styles/blocks/SearchRow.module.scss';

/**
 * Aside search trigger (`search_leftmenu`) — opens global AppSearch.
 * `blockVariants.search`: `icon` → ActionIcon; `row` → TextInput slot.
 * Slideout collapsed rail forces overlay (`modal`) so CSS-hidden field still opens the host.
 */
function SearchComponent({ item, className }: BlockProps) {
  const { blockVariants, behaviors, capabilities } = useSidebarConfig();
  const { enabled: slideoutOn, phase } = useSidebarSlideout();
  const Adapter = useAdapter(SEARCH_ADAPTERS, blockVariants.search, SEARCH_ADAPTER_KEYS);
  const enabled = isCapabilityEnabled(capabilities, 'search');
  /** Collapsed / collapsing rail — icon look via SlideoutType CSS; open as modal, not inline input. */
  const railOverlay =
    slideoutOn && (phase === 'collapsed' || phase === 'collapsing') ? 'modal' : undefined;
  const searchBehavior = railOverlay ?? behaviors.search;
  const { searchQuery, onActivate, onSearchQueryChange, showHotkeyBadge } =
    useAppSearchTrigger(searchBehavior);

  const preload = useCallback(() => {
    preloadAdapters(SEARCH_ADAPTERS, blockVariants.search, SEARCH_ADAPTER_KEYS);
    preloadSearchType(searchBehavior);
  }, [blockVariants.search, searchBehavior]);

  useLayoutEffect(() => {
    if (!enabled) return;
    preload();
  }, [enabled, preload]);

  if (!enabled || !Adapter) return null;

  const isInputSlot = blockVariants.search === 'row';

  const host = (
    <LazyHost
      component={Adapter}
      item={item}
      className={className}
      onActivate={onActivate}
      showHotkeyBadge={showHotkeyBadge}
      {...(onSearchQueryChange !== undefined ? { searchQuery, onSearchQueryChange } : {})}
    />
  );

  if (isInputSlot) {
    return (
      <div className={styles.slot} data-search-slot="input" onPointerEnter={preload}>
        <AdapterBoundary>{host}</AdapterBoundary>
      </div>
    );
  }

  // Icon chrome — no width-100% slot wrapper (must match sibling ActionIcons).
  return (
    <div className={styles.iconHost} onPointerEnter={preload}>
      <AdapterBoundary>{host}</AdapterBoundary>
    </div>
  );
}

export const Search = memo(SearchComponent);
Search.displayName = 'SidebarSearch';
