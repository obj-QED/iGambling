import type { WidgetAdapterLoader } from '@/shared/lib/widgetAdapter';

export const PROMO_ADAPTER_KEYS = ['row', 'icon'] as const;
export type PromoAdapterKey = (typeof PROMO_ADAPTER_KEYS)[number];

export const PROMO_ADAPTERS: Record<PromoAdapterKey, WidgetAdapterLoader> = {
  row: () =>
    import('./variants/PromoRowVariant').then((m) => ({
      default: m.PromoRowVariant,
    })),
  icon: () =>
    import('./variants/PromoIconVariant').then((m) => ({
      default: m.PromoIconVariant,
    })),
};
