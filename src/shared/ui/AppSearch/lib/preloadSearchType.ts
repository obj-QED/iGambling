const SEARCH_TYPE_LOADERS = {
  modal: () => import('../type/modal/SearchModalType'),
  spotlight: () => import('../type/spotlight/SearchSpotlightType'),
  input: () => import('../type/input/SearchInputType'),
} as const;

/** Warm the resolved `params.search.type` host — never the other types. */
export function preloadSearchType(type: string | undefined): void {
  if (type && Object.hasOwn(SEARCH_TYPE_LOADERS, type)) {
    void SEARCH_TYPE_LOADERS[type as keyof typeof SEARCH_TYPE_LOADERS]();
  }
}
