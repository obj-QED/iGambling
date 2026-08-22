import type { BlockProps } from '../../../types';
import type { AdapterRegistry } from '@/shared/lib';

export const PROMO_ADAPTER_KEYS = ['row', 'icon'] as const;
export type PromoAdapterKey = (typeof PROMO_ADAPTER_KEYS)[number];

export const PROMO_ADAPTERS = {
  row: () => import('./variants/PromoRowVariant'),
  icon: () => import('./variants/PromoIconVariant'),
} as const satisfies AdapterRegistry<PromoAdapterKey, BlockProps>;
