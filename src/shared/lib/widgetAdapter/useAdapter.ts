import type { AdapterRegistry, WidgetAdapterLoader } from './types';
import type { ComponentType, LazyExoticComponent } from 'react';

import { useMemo } from 'react';

import { getLazyAdapter } from './lazyAdapter';

/**
 * Resolve which adapter key will render: requested → fallbackKeys → first key.
 */
export function resolveAdapterKey<TVariant extends string, TProps>(
  adapters: AdapterRegistry<TVariant, TProps>,
  variant: TVariant | string | undefined,
  fallbackKeys: readonly TVariant[] = [],
): TVariant | null {
  const keys = Object.keys(adapters) as TVariant[];
  if (keys.length === 0) return null;

  const requested = variant?.trim() ?? '';
  if (requested.length > 0 && Object.hasOwn(adapters, requested)) {
    return requested as TVariant;
  }

  return fallbackKeys.find((candidate) => Object.hasOwn(adapters, candidate)) ?? keys[0];
}

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
    const key = resolveAdapterKey(adapters, variant, fallbackKeys);
    if (!key) return null;
    const loader = adapters[key] as WidgetAdapterLoader<TProps> | undefined;
    if (!loader) return null;
    return getLazyAdapter(loader);
  }, [adapters, variant, fallbackKeys]);
}

/** Warm the adapter that will render — never a hardcoded default like `compact`. */
export function preloadAdapters<TVariant extends string, TProps>(
  adapters: AdapterRegistry<TVariant, TProps>,
  variant?: TVariant | string,
  fallbackKeys: readonly TVariant[] = [],
): void {
  const key = resolveAdapterKey(adapters, variant, fallbackKeys);
  if (!key) return;
  void adapters[key]();
}
