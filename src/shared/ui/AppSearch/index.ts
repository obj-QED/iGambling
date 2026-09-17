export { AppSearch, type AppSearchProps } from './AppSearch';
export {
  DEFAULT_SEARCH_SCHEMA,
  resolveSearchSchema,
  SEARCH_STYLE_COMPACT,
  SEARCH_STYLE_ICON,
  SEARCH_STYLE_INPUT,
  SEARCH_STYLE_KEYS,
  SEARCH_STYLE_REGISTRY,
  SEARCH_TYPE_KEYS,
  type SearchBehaviorType,
  type SearchSchema,
  type SearchStyleKey,
  type SearchTypeKey,
} from './config';
export { useSearchConfig, useSearchConfigOptional } from './context';
export {
  appSearch,
  appSpotlight,
  appSpotlightStore,
  DATA_SEARCH,
  type DataSearchAttr,
  getSearchState,
  preloadSearchType,
  type SearchOpenMode,
  type SearchPageMode,
  type SearchState,
  subscribeSearch,
  useAppSearchTrigger,
  useSearchModalOpen,
  useSearchPageMode,
  useSearchQuery,
  useSearchState,
} from './lib';
export type { SearchInputTypeProps as SearchResultsProps } from './type/input/SearchInputType';
export { shouldShowSearchResults } from './type/input/shouldShowSearchResults';
export { SearchIconTrigger, type SearchIconTriggerProps } from './ui/icon';
export {
  SearchInputStyle,
  type SearchInputStyleProps,
  SearchInputTrigger,
  type SearchInputTriggerProps,
} from './ui/input';
