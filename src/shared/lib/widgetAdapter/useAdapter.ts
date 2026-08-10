import type { WidgetAdapterLoader, WidgetAdapters } from './types';
import type { ComponentType } from 'react';

import { lazy, useMemo } from 'react';

/**
 * Resolve a lazy adapter by variant key.
 * Unknown / empty → first matching `fallbackKeys`, else first adapter key.
 */
export function useAdapter(
  adapters: WidgetAdapters,
  variant: string | undefined,
  fallbackKeys: readonly string[] = ['compact', 'row'],
): ComponentType<Record<string, unknown>> | null {
  return useMemo(() => {
    const keys = Object.keys(adapters);
    if (keys.length === 0) return null;

    const requested = variant?.trim() ?? '';
    let key = requested.length > 0 && Object.hasOwn(adapters, requested) ? requested : undefined;

    if (!key) {
      key = fallbackKeys.find((candidate) => Object.hasOwn(adapters, candidate)) ?? keys[0];
    }

    const loader = adapters[key as string] as WidgetAdapterLoader | undefined;
    if (!loader) return null;
    return lazy(loader) as ComponentType<Record<string, unknown>>;
  }, [adapters, variant, fallbackKeys]);
}

export function preloadAdapters(adapters: WidgetAdapters, key?: string): void {
  if (key && Object.hasOwn(adapters, key)) {
    void adapters[key]!();
    return;
  }
  const first = Object.values(adapters)[0];
  if (first) void first();
}
