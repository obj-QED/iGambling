import { SEARCH_TYPE_KEYS, type SearchTypeKey } from './keys';

/**
 * Search hosts — loaders only. Resolve `params.search.type`, then import that one.
 */
export const SEARCH_TYPE_LOADERS = {
  modal: () => import('./modal/SearchModalType'),
  spotlight: () => import('./spotlight/SearchSpotlightType'),
  input: () => import('./input/SearchInputType'),
} as const;

export { SEARCH_TYPE_KEYS, type SearchTypeKey };
export type { SearchInputTypeProps } from './input/SearchInputType';
export { shouldShowSearchResults } from './input/shouldShowSearchResults';
export type { SearchSpotlightTypeProps } from './spotlight/SearchSpotlightType';
