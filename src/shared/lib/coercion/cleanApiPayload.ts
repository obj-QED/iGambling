import { isRecord } from './isRecord';

/**
 * Strips API noise before parse — values stay as-is except empty containers/scalars.
 * Removes: `undefined`, `""`, `[]`, `{}`. Keeps: `null`, non-empty strings (incl. whitespace), other scalars.
 */
export function cleanApiPayload<T = unknown>(value: T): T | undefined {
  if (value === undefined) return undefined;
  if (value === null) return value;
  if (value === '') return undefined;

  if (Array.isArray(value)) {
    const cleaned: unknown[] = [];

    for (const entry of value) {
      const next = cleanApiPayload(entry);
      if (next !== undefined) cleaned.push(next);
    }

    return (cleaned.length === 0 ? undefined : cleaned) as T;
  }

  if (isRecord(value)) {
    const cleaned: Record<string, unknown> = {};

    for (const [key, entry] of Object.entries(value)) {
      const next = cleanApiPayload(entry);
      if (next !== undefined) cleaned[key] = next;
    }

    return (Object.keys(cleaned).length === 0 ? undefined : cleaned) as T;
  }

  return value;
}
