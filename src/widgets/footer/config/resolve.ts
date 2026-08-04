import type { FooterSchema } from '../types/schema.types';

import { type FooterSettings, getSettings } from '@/shared/config';
import { readSettingsKey } from '@/shared/lib/coercion';
import { resolveWidgetSchema, type SchemaLayers } from '@/shared/schema';

import { DEFAULT_FOOTER_SCHEMA } from './defaults';

export type FooterSchemaLayer = Partial<FooterSettings> & Partial<FooterSchema>;

function coerceFooterSchema(merged: FooterSchema & FooterSchemaLayer): FooterSchema {
  const behavior = { ...DEFAULT_FOOTER_SCHEMA.behavior, ...merged.behavior };

  return {
    version: merged.version === 2 ? 2 : 1,
    layout: readSettingsKey(merged.layout, DEFAULT_FOOTER_SCHEMA.layout),
    variant: readSettingsKey(merged.variant, DEFAULT_FOOTER_SCHEMA.variant),
    behavior,
    capabilities: {
      ...DEFAULT_FOOTER_SCHEMA.capabilities,
      ...merged.capabilities,
    },
  };
}

export function resolveFooterSchema(layers: SchemaLayers<FooterSchema> = {}): FooterSchema {
  return resolveWidgetSchema(DEFAULT_FOOTER_SCHEMA, layers, {
    supportedVersions: [1, 2],
    coerce: (merged) => coerceFooterSchema(merged as FooterSchema & FooterSchemaLayer),
  });
}

/** @deprecated Prefer `resolveFooterSchema({ global: settings.footer })`. */
export function resolveFooterConfig(
  settings = getSettings(),
  overrides?: Partial<FooterSettings>,
): FooterSchema {
  return resolveFooterSchema({
    global: settings.footer as Partial<FooterSchema> | undefined,
    props: overrides as Partial<FooterSchema> | undefined,
  });
}
