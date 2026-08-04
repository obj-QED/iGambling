import type { BehaviorFlags, SchemaVersion } from '@/shared/schema';

export const BANNER_LAYOUT_KEYS = ['default', 'hero', 'compact'] as const;
export type BannerLayoutKey = (typeof BANNER_LAYOUT_KEYS)[number] | string;

export const BANNER_VARIANT_KEYS = ['default', 'carousel'] as const;
export type BannerVariantKey = (typeof BANNER_VARIANT_KEYS)[number] | string;

export type BannerBehaviorSettings = BehaviorFlags & {
  autoplay?: boolean;
};

export type BannerCapabilitiesSettings = Partial<Record<string, boolean>>;

export type BannerSettings = {
  version?: SchemaVersion | number | string;
  layout?: BannerLayoutKey;
  variant?: BannerVariantKey;
  behavior?: BannerBehaviorSettings;
  capabilities?: BannerCapabilitiesSettings;
};
