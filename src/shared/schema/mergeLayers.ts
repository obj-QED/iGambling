import { isRecord } from '@/shared/lib/coercion';

/**
 * Deep-merge plain objects. Arrays and non-plain values are replaced by later layers.
 * `undefined` source values do not overwrite.
 */
export function deepMerge<T>(base: T, overlay: Partial<T> | undefined): T {
  if (overlay === undefined) return base;

  if (!isRecord(base) || !isRecord(overlay)) {
    return overlay as T;
  }

  const result: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(overlay)) {
    if (value === undefined) continue;

    const prev = result[key];
    if (isRecord(prev) && isRecord(value) && !Array.isArray(prev) && !Array.isArray(value)) {
      result[key] = deepMerge(prev, value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

/**
 * Apply schema inheritance: defaults → global → brand → page → props.
 */
export function mergeSchemaLayers<T extends object>(
  defaults: T,
  layers: {
    global?: Partial<T>;
    brand?: Partial<T>;
    page?: Partial<T>;
    props?: Partial<T>;
  },
): T {
  let merged = defaults;
  merged = deepMerge(merged, layers.global);
  merged = deepMerge(merged, layers.brand);
  merged = deepMerge(merged, layers.page);
  merged = deepMerge(merged, layers.props);
  return merged;
}
