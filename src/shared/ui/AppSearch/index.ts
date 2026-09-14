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
  getSearchState,
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
export {
  SEARCH_TYPE_REGISTRY,
  SearchInputType,
  type SearchInputTypeProps,
  SearchModalContent,
  SearchModalContext,
  SearchModalType,
  SearchResults,
  type SearchResultsProps,
  SearchSpotlight,
  type SearchSpotlightProps,
  SearchSpotlightType,
  type SearchSpotlightTypeProps,
  shouldShowSearchResults,
} from './type';
export {
  SearchIconTrigger,
  type SearchIconTriggerProps,
  SearchInputStyle,
  type SearchInputStyleProps,
  SearchInputTrigger,
  type SearchInputTriggerProps,
} from './ui';
