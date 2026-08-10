import type { WidgetAdapterLoader } from '@/shared/lib/widgetAdapter';

export const WALLET_ADAPTER_KEYS = ['compact', 'full'] as const;
export type WalletAdapterKey = (typeof WALLET_ADAPTER_KEYS)[number];

export const WALLET_ADAPTERS: Record<WalletAdapterKey, WidgetAdapterLoader> = {
  compact: () =>
    import('./variants/WalletCompactVariant').then((m) => ({
      default: m.WalletCompactVariant,
    })),
  full: () =>
    import('./variants/WalletFullVariant').then((m) => ({
      default: m.WalletFullVariant,
    })),
};
