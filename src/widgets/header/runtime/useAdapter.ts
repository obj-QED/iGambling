import type { HeaderPlugin } from '../sdk';
import type { ComponentType } from 'react';

import { lazy, useMemo } from 'react';

/**
 * Resolve a lazy adapter component for the given plugin + variant.
 * Unknown variant → `compact` when present, else first adapter key.
 */
export function useAdapter(
  plugin: HeaderPlugin | undefined,
  variant: string | undefined,
): ComponentType<Record<string, unknown>> | null {
  return useMemo(() => {
    if (!plugin) return null;

    const adapters = plugin.adapters;
    const keys = Object.keys(adapters);
    if (keys.length === 0) return null;

    const requested = variant?.trim() ?? '';
    const key =
      requested.length > 0 && Object.hasOwn(adapters, requested)
        ? requested
        : Object.hasOwn(adapters, 'compact')
          ? 'compact'
          : keys[0];

    const loader = adapters[key as string];
    // key is always from Object.keys / hasOwn
    return lazy(loader!) as ComponentType<Record<string, unknown>>;
  }, [plugin, variant]);
}

export function preloadPlugin(plugin: HeaderPlugin | undefined): void {
  plugin?.preload?.();
}
