import type { SearchState } from './searchTypes';

import { useSelector } from 'react-redux';

import {
  type AppSearchContextState,
  selectAppSearchContext,
  selectAppSearchModalOpen,
  selectAppSearchPageMode,
  selectAppSearchQuery,
} from '@store/slices/contextSlice';

export function useSearchState(): SearchState {
  const { query, modalOpen, pageMode } = useSelector(selectAppSearchContext);
  return { query, modalOpen, pageMode };
}

export function useSearchQuery(): string {
  return useSelector(selectAppSearchQuery);
}

export function useSearchModalOpen(): boolean {
  return useSelector(selectAppSearchModalOpen);
}

export function useSearchPageMode(): AppSearchContextState['pageMode'] {
  return useSelector(selectAppSearchPageMode);
}
