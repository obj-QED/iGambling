import type { BehaviorFlags, SchemaVersion } from '@/shared/schema';

export const FOOTER_LAYOUT_KEYS = ['default', 'compact', 'columns'] as const;
export type FooterLayoutKey = (typeof FOOTER_LAYOUT_KEYS)[number] | string;

export const FOOTER_VARIANT_KEYS = ['default', 'minimal'] as const;
export type FooterVariantKey = (typeof FOOTER_VARIANT_KEYS)[number] | string;

export type FooterBehaviorSettings = BehaviorFlags;

export type FooterCapabilitiesSettings = Partial<Record<string, boolean>>;

export type FooterSettings = {
  version?: SchemaVersion | number | string;
  layout?: FooterLayoutKey;
  variant?: FooterVariantKey;
  behavior?: FooterBehaviorSettings;
  capabilities?: FooterCapabilitiesSettings;
};
