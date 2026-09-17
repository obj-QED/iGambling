/**
 * Global AppSearch marker — use on every search surface (trigger / modal / input / spotlight).
 * Prefer `data-search="true"` over a global class like `cmf-search-row`.
 */
export const DATA_SEARCH = { 'data-search': 'true' } as const;

export type DataSearchAttr = typeof DATA_SEARCH;
