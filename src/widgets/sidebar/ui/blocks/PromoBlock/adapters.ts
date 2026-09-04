import type { BlockProps } from '../../../types';
import type { AdapterRegistry } from '@/shared/lib';

import { PromoIconVariant } from './variants/PromoIconVariant';

export const PROMO_ADAPTER_KEYS = ['row', 'icon'] as const;
export type PromoAdapterKey = (typeof PROMO_ADAPTER_KEYS)[number];

/**
 * `icon` is sync — compact typePack also mounts it without Suspense
 * (`compact/index` imports the variant directly; keep this eager to avoid
 * INEFFECTIVE_DYNAMIC_IMPORT).
 * `row` stays lazy (default / non-compact).
 */
export const PROMO_ADAPTERS = {
  row: () => import('./variants/PromoRowVariant'),
  icon: () => Promise.resolve({ default: PromoIconVariant }),
} as const satisfies AdapterRegistry<PromoAdapterKey, BlockProps>;
