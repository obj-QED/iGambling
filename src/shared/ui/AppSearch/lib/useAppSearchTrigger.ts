import { useMemo } from 'react';

import {
  isSearchInputBehavior,
  isSearchOverlayBehavior,
  isSpotlightSearchBehavior,
} from '@/shared/config';

import { appSearch } from './searchStore';
import { useSearchQuery } from './useSearchState';

/** Wire header/aside search triggers to the global AppSearch host. */
export function useAppSearchTrigger(behavior: string | undefined) {
  const searchQuery = useSearchQuery();

  const onActivate = useMemo(() => {
    if (!isSearchOverlayBehavior(behavior)) return undefined;
    return () => {
      appSearch.open(isSpotlightSearchBehavior(behavior) ? 'spotlight' : 'modal');
    };
  }, [behavior]);

  const onSearchQueryChange = useMemo(() => {
    if (!isSearchInputBehavior(behavior)) return undefined;
    return (query: string) => {
      appSearch.enableInputMode();
      appSearch.setQuery(query);
    };
  }, [behavior]);

  return {
    searchQuery,
    onActivate,
    onSearchQueryChange,
    showHotkeyBadge: isSpotlightSearchBehavior(behavior),
  };
}
