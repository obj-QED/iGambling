import { SearchInputType, type SearchInputTypeProps } from './input';
import { SEARCH_TYPE_KEYS, type SearchTypeKey } from './keys';
import { SearchModalContent, SearchModalType } from './modal';
import { SearchSpotlightType, type SearchSpotlightTypeProps } from './spotlight';

/**
 * Overlay hosts. Modal chrome is `@mantine/modals` context modal `search`
 * (see SearchModalContent); spotlight still mounts under AppSearch.
 */
export const SEARCH_TYPE_OVERLAY_REGISTRY = {
  modal: SearchModalContent,
  spotlight: SearchSpotlightType,
} as const;

export const SEARCH_TYPE_REGISTRY = {
  ...SEARCH_TYPE_OVERLAY_REGISTRY,
  input: SearchInputType,
} as const;

export { SEARCH_TYPE_KEYS, type SearchTypeKey };
export { SearchInputType, type SearchInputTypeProps, shouldShowSearchResults } from './input';
export { SearchModalContent, SearchModalContext, SearchModalType } from './modal';
export { SearchSpotlightType, type SearchSpotlightTypeProps } from './spotlight';

/** @deprecated Prefer SearchModalType */
export const SearchModal = SearchModalType;
/** @deprecated Prefer SearchSpotlightType */
export const SearchSpotlight = SearchSpotlightType;
/** @deprecated Prefer SearchInputType */
export const SearchResults = SearchInputType;

export type SearchSpotlightProps = SearchSpotlightTypeProps;
export type SearchResultsProps = SearchInputTypeProps;
