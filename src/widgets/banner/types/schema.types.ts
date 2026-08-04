import type { BannerLayoutKey, BannerVariantKey } from '@/shared/config/bannerSettings';
import type { SchemaVersion } from '@/shared/schema';

export type BannerBehaviorConfig = {
  sticky: boolean;
  transparent: boolean;
  hideOnScroll: boolean;
  autoplay: boolean;
};

export type BannerCapabilitiesConfig = Record<string, boolean>;

export type BannerSchema = {
  version: SchemaVersion;
  layout: BannerLayoutKey;
  variant: BannerVariantKey;
  behavior: BannerBehaviorConfig;
  capabilities: BannerCapabilitiesConfig;
};
