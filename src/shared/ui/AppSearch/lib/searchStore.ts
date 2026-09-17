import type { SearchOpenMode, SearchState } from './searchTypes';

import { modals } from '@mantine/modals';

import { store } from '@store';
import {
  resetAppSearchInput,
  setAppSearchModalOpen,
  setAppSearchPageMode,
  setAppSearchQuery,
} from '@store/slices/contextSlice';

import { resolveSearchModalProps } from '@/shared/config';

import { DATA_SEARCH } from './searchDataAttrs';
import { appSpotlight } from './spotlightStore';

export type { SearchOpenMode, SearchPageMode, SearchState } from './searchTypes';

export function getSearchState(): SearchState {
  const { query, modalOpen, pageMode } = store.getState().context.appSearch;
  return { query, modalOpen, pageMode };
}

export function subscribeSearch(listener: () => void): () => void {
  return store.subscribe(listener);
}

/**
 * Global search controller — Redux `context.appSearch` + modals / spotlight hosts.
 */
export const appSearch = {
  open(mode: SearchOpenMode): void {
    if (mode === 'spotlight') {
      const { modalId, modalOpen } = store.getState().context.appSearch;
      if (modalOpen && modalId !== undefined) {
        modals.close(modalId);
      }
      store.dispatch(setAppSearchModalOpen({ open: false }));
      store.dispatch(setAppSearchPageMode('idle'));
      appSpotlight.open();
      return;
    }

    appSpotlight.close();

    const modalProps = resolveSearchModalProps({
      title: 'Search',
      size: 'lg',
    });

    const modalId = modals.openContextModal({
      modal: 'search',
      ...modalProps,
      ...DATA_SEARCH,
      'data-cmf-component': 'search',
      'data-cmf-key': 'modal',
      'data-search-type': 'modal',
      onClose: () => {
        store.dispatch(setAppSearchModalOpen({ open: false }));
      },
      innerProps: {},
    });

    store.dispatch(setAppSearchModalOpen({ open: true, modalId }));
    store.dispatch(setAppSearchPageMode('idle'));
  },

  close(): void {
    appSpotlight.close();
    const { modalId, modalOpen } = store.getState().context.appSearch;
    if (modalOpen && modalId !== undefined) {
      modals.close(modalId);
    }
    store.dispatch(setAppSearchModalOpen({ open: false }));
  },

  setQuery(query: string): void {
    store.dispatch(setAppSearchQuery(query));
  },

  enableInputMode(): void {
    store.dispatch(setAppSearchPageMode('input'));
  },

  clearInputMode(): void {
    store.dispatch(resetAppSearchInput());
  },
};
