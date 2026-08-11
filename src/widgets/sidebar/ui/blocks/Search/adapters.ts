import type { WidgetAdapterLoader } from '@/shared/lib';

export const SEARCH_ADAPTER_KEYS = ['row', 'icon'] as const;
export type SearchAdapterKey = (typeof SEARCH_ADAPTER_KEYS)[number];

export const SEARCH_ADAPTERS: Record<SearchAdapterKey, WidgetAdapterLoader> = {
  row: () =>
    import('./variants/SearchRowVariant').then((m) => ({
      default: m.SearchRowVariant,
    })),
  icon: () =>
    import('./variants/SearchIconVariant').then((m) => ({
      default: m.SearchIconVariant,
    })),
};
