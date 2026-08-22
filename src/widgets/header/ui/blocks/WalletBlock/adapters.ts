import type { BlockProps } from '../../../types';
import type { AdapterRegistry } from '@/shared/lib';

export const WALLET_ADAPTER_KEYS = ['compact', 'full'] as const;
export type WalletAdapterKey = (typeof WALLET_ADAPTER_KEYS)[number];

export const WALLET_ADAPTERS = {
  compact: () => import('./variants/WalletCompactVariant'),
  full: () => import('./variants/WalletFullVariant'),
} as const satisfies AdapterRegistry<WalletAdapterKey, BlockProps>;
