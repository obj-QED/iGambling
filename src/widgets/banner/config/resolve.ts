import type { BannerSchema } from '../types/schema.types';

import { type BannerSettings, getSettings } from '@/shared/config';
import { readSettingsKey } from '@/shared/lib/coercion';
import { resolveWidgetSchema, type SchemaLayers } from '@/shared/schema';

import { DEFAULT_BANNER_SCHEMA } from './defaults';

export type BannerSchemaLayer = Partial<BannerSettings> & Partial<BannerSchema>;

function coerceBannerSchema(merged: BannerSchema & BannerSchemaLayer): BannerSchema {
  const behavior = { ...DEFAULT_BANNER_SCHEMA.behavior, ...merged.behavior };

  return {
    version: merged.version === 2 ? 2 : 1,
    layout: readSettingsKey(merged.layout, DEFAULT_BANNER_SCHEMA.layout),
    variant: readSettingsKey(merged.variant, DEFAULT_BANNER_SCHEMA.variant),
    behavior,
    capabilities: {
      ...DEFAULT_BANNER_SCHEMA.capabilities,
      ...merged.capabilities,
    },
  };
}

export function resolveBannerSchema(layers: SchemaLayers<BannerSchema> = {}): BannerSchema {
  return resolveWidgetSchema(DEFAULT_BANNER_SCHEMA, layers, {
    supportedVersions: [1, 2],
    coerce: (merged) => coerceBannerSchema(merged as BannerSchema & BannerSchemaLayer),
  });
}

/** @deprecated Prefer `resolveBannerSchema({ global: settings.banner })`. */
export function resolveBannerConfig(
  settings = getSettings(),
  overrides?: Partial<BannerSettings>,
): BannerSchema {
  return resolveBannerSchema({
    global: settings.banner as Partial<BannerSchema> | undefined,
    props: overrides as Partial<BannerSchema> | undefined,
  });
}
