import type { BlockProps } from '../../../types';
import type { AdapterRegistry } from '@/shared/lib';

import { SearchIconVariant } from './variants/SearchIconVariant';

export const SEARCH_ADAPTER_KEYS = ['row', 'icon'] as const;
export type SearchAdapterKey = (typeof SEARCH_ADAPTER_KEYS)[number];

/**
 * `icon` is sync — compact typePack also mounts it without Suspense
 * (`compact/index` imports the variant directly; keep this eager to avoid
 * INEFFECTIVE_DYNAMIC_IMPORT).
 * `row` stays lazy (default / non-compact).
 */
export const SEARCH_ADAPTERS = {
  row: () => import('./variants/SearchRowVariant'),
  icon: () => Promise.resolve({ default: SearchIconVariant }),
} as const satisfies AdapterRegistry<SearchAdapterKey, BlockProps>;
