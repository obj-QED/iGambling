import type { RootState } from '@store';

import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { selectAppSearchQuery } from '@store/slices/contextSlice';

import {
  isSearchInputBehavior,
  isSearchOverlayBehavior,
  isSpotlightSearchBehavior,
} from '@/shared/config';

import { appSearch } from './searchStore';

/** Wire header/aside search triggers to the global AppSearch host. */
export function useAppSearchTrigger(behavior: string | undefined) {
  const inputMode = isSearchInputBehavior(behavior);
  /** Overlay triggers must not subscribe to query — typing in the modal would re-render every search chrome. */
  const searchQuery = useSelector((state: RootState) =>
    inputMode ? selectAppSearchQuery(state) : '',
  );

  const onActivate = useMemo(() => {
    if (!isSearchOverlayBehavior(behavior)) return undefined;
    return () => {
      appSearch.open(isSpotlightSearchBehavior(behavior) ? 'spotlight' : 'modal');
    };
  }, [behavior]);

  const onSearchQueryChange = useMemo(() => {
    if (!inputMode) return undefined;
    return (query: string) => {
      appSearch.enableInputMode();
      appSearch.setQuery(query);
    };
  }, [inputMode]);

  return {
    searchQuery: searchQuery ?? '',
    onActivate,
    onSearchQueryChange,
    showHotkeyBadge: isSpotlightSearchBehavior(behavior),
  };
}
