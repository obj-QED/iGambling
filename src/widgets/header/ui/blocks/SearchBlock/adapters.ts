import type { WidgetAdapterLoader } from '@/shared/lib';

export const SEARCH_ADAPTER_KEYS = ['compact', 'input'] as const;
export type SearchAdapterKey = (typeof SEARCH_ADAPTER_KEYS)[number];

export const SEARCH_ADAPTERS: Record<SearchAdapterKey, WidgetAdapterLoader> = {
  compact: () =>
    import('./variants/SearchIconVariant').then((m) => ({
      default: m.SearchIconVariant,
    })),
  input: () =>
    import('./variants/SearchInputVariant').then((m) => ({
      default: m.SearchInputVariant,
    })),
};
