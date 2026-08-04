import type { BaseWidgetSchema, ResolveSchemaOptions, SchemaLayers, SchemaVersion } from './types';

import { mergeSchemaLayers } from './mergeLayers';
import { SCHEMA_VERSIONS } from './types';

function readVersion(raw: unknown): unknown {
  if (typeof raw === 'number' && Number.isFinite(raw)) return Math.trunc(raw);
  if (typeof raw === 'string' && raw.trim().length > 0) {
    const n = Number(raw);
    if (Number.isFinite(n)) return Math.trunc(n);
  }
  return raw;
}

function isSupportedVersion(
  version: unknown,
  supported: readonly SchemaVersion[],
): version is SchemaVersion {
  return typeof version === 'number' && (supported as readonly number[]).includes(version);
}

/**
 * Resolve a widget schema from defaults + optional inheritance layers.
 * Unsupported `version` → return coerced defaults (DEV warning).
 */
export function resolveWidgetSchema<T extends BaseWidgetSchema>(
  defaults: T,
  layers: SchemaLayers<T> = {},
  options: ResolveSchemaOptions<T> = {},
): T {
  const supported = options.supportedVersions ?? SCHEMA_VERSIONS;
  const merged = mergeSchemaLayers(defaults, layers);
  const version = readVersion((merged as BaseWidgetSchema).version);

  if (!isSupportedVersion(version, supported)) {
    options.onUnsupportedVersion?.(version);
    if (import.meta.env.DEV) {
      console.warn(
        `[schema] Unsupported schema version ${String(version)}; falling back to defaults.`,
      );
    }
    return options.coerce ? options.coerce({ ...defaults }) : { ...defaults };
  }

  const withVersion = { ...merged, version } as T;
  return options.coerce ? options.coerce(withVersion) : withVersion;
}
