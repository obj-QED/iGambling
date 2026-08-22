import type { WidgetAdapterLoader } from './types';
import type { ComponentType, LazyExoticComponent } from 'react';

import { lazy } from 'react';

const lazyByLoader = new WeakMap<
  WidgetAdapterLoader<unknown>,
  LazyExoticComponent<ComponentType<unknown>>
>();

/** Stable `lazy()` per loader — created once, not on each render-path lookup. */
export function getLazyAdapter<TProps>(
  loader: WidgetAdapterLoader<TProps>,
): LazyExoticComponent<ComponentType<TProps>> {
  const key = loader as WidgetAdapterLoader<unknown>;
  const cached = lazyByLoader.get(key);
  if (cached) {
    return cached as LazyExoticComponent<ComponentType<TProps>>;
  }

  const created = lazy(loader) as LazyExoticComponent<ComponentType<unknown>>;
  lazyByLoader.set(key, created);
  return created as LazyExoticComponent<ComponentType<TProps>>;
}
