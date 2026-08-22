import type { BlockProps } from '../../../types';
import type { AdapterRegistry } from '@/shared/lib';

export const SEARCH_ADAPTER_KEYS = ['row', 'icon'] as const;
export type SearchAdapterKey = (typeof SEARCH_ADAPTER_KEYS)[number];

export const SEARCH_ADAPTERS = {
  row: () => import('./variants/SearchRowVariant'),
  icon: () => import('./variants/SearchIconVariant'),
} as const satisfies AdapterRegistry<SearchAdapterKey, BlockProps>;
