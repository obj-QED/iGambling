import type { BlockProps } from '../../../types';
import type { AdapterRegistry } from '@/shared/lib';

export const SEARCH_ADAPTER_KEYS = ['compact', 'input'] as const;
export type SearchAdapterKey = (typeof SEARCH_ADAPTER_KEYS)[number];

export const SEARCH_ADAPTERS = {
  compact: () => import('./variants/SearchIconVariant'),
  input: () => import('./variants/SearchInputVariant'),
} as const satisfies AdapterRegistry<SearchAdapterKey, BlockProps>;
