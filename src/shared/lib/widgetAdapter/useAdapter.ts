import type { AdapterRegistry, WidgetAdapterLoader } from './types';
import type { ComponentType, LazyExoticComponent } from 'react';

import { useMemo } from 'react';

import { getLazyAdapter } from './lazyAdapter';

/**
 * Resolve a stable lazy adapter by variant key.
 * Unknown / empty → first matching `fallbackKeys`, else first adapter key.
 */
export function useAdapter<TVariant extends string, TProps>(
  adapters: AdapterRegistry<TVariant, TProps>,
  variant: TVariant | string | undefined,
  fallbackKeys: readonly TVariant[] = [],
): LazyExoticComponent<ComponentType<TProps>> | null {
  return useMemo(() => {
    const keys = Object.keys(adapters) as TVariant[];
    if (keys.length === 0) return null;

    const requested = variant?.trim() ?? '';
    let key =
      requested.length > 0 && Object.hasOwn(adapters, requested)
        ? (requested as TVariant)
        : undefined;

    if (!key) {
      key = fallbackKeys.find((candidate) => Object.hasOwn(adapters, candidate)) ?? keys[0];
    }

    const loader = adapters[key] as WidgetAdapterLoader<TProps> | undefined;
    if (!loader) return null;
    return getLazyAdapter(loader);
  }, [adapters, variant, fallbackKeys]);
}

export function preloadAdapters<TVariant extends string, TProps>(
  adapters: AdapterRegistry<TVariant, TProps>,
  key?: TVariant | string,
): void {
  if (key && Object.hasOwn(adapters, key)) {
    void adapters[key as TVariant]();
    return;
  }
  const first = Object.values(adapters)[0] as WidgetAdapterLoader<TProps> | undefined;
  if (first) void first();
}
