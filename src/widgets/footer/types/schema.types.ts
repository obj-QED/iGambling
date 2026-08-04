import type { FooterLayoutKey, FooterVariantKey } from '@/shared/config/footerSettings';
import type { SchemaVersion } from '@/shared/schema';

export type FooterBehaviorConfig = {
  sticky: boolean;
  transparent: boolean;
  hideOnScroll: boolean;
};

export type FooterCapabilitiesConfig = Record<string, boolean>;

export type FooterSchema = {
  version: SchemaVersion;
  layout: FooterLayoutKey;
  variant: FooterVariantKey;
  behavior: FooterBehaviorConfig;
  capabilities: FooterCapabilitiesConfig;
};
