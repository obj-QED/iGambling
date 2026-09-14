/** Settings `type` — which AppSearch host runs. */
export const SEARCH_TYPE_KEYS = ['modal', 'spotlight', 'input'] as const;

export type SearchTypeKey = (typeof SEARCH_TYPE_KEYS)[number];
