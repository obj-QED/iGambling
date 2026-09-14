/** Settings `style` — trigger chrome (header/aside adapters map onto these). */
export const SEARCH_STYLE_KEYS = ['compact', 'icon', 'input'] as const;

export type SearchStyleKey = (typeof SEARCH_STYLE_KEYS)[number];

/** `style: compact` — dense icon control (header ActionIcon / aside rail). */
export const SEARCH_STYLE_COMPACT = 'compact' as const;

/** `style: icon` — icon-only trigger (aside `icon`; header maps `icon` → `compact`). */
export const SEARCH_STYLE_ICON = 'icon' as const;

/** `style: input` — text-field trigger (header `input` / aside `row`). */
export const SEARCH_STYLE_INPUT = 'input' as const;

/**
 * Style-key registry (schema only — not JSX).
 * Paint/adapters: header/aside `ui/blocks` + `mapHeaderSearchStyle` / `mapAsideSearchStyle`.
 */
export const SEARCH_STYLE_REGISTRY = {
  compact: SEARCH_STYLE_COMPACT,
  icon: SEARCH_STYLE_ICON,
  input: SEARCH_STYLE_INPUT,
} as const satisfies Record<SearchStyleKey, SearchStyleKey>;
