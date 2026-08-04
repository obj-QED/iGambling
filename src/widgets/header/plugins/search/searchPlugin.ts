import { defineHeaderPlugin } from '../../sdk';

export const SEARCH_ADAPTER_KEYS = ['compact', 'input'] as const;
export type SearchAdapterKey = (typeof SEARCH_ADAPTER_KEYS)[number];

export const searchPlugin = defineHeaderPlugin({
  key: 'search',
  adapters: {
    compact: () =>
      import('../../ui/blocks/SearchBlock/variants/SearchIconVariant').then((m) => ({
        default: m.SearchIconVariant,
      })),
    input: () =>
      import('../../ui/blocks/SearchBlock/variants/SearchInputVariant').then((m) => ({
        default: m.SearchInputVariant,
      })),
  },
  preload: () => {
    void import('../../ui/blocks/SearchBlock/variants/SearchIconVariant');
  },
  entity: 'search',
});
