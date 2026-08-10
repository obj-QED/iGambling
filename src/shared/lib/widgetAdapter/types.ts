import type { ComponentType } from 'react';

/** Lazy adapter module loader — default export is the variant component. */
export type WidgetAdapterLoader = () => Promise<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ComponentType<any>;
}>;

export type WidgetAdapters = Record<string, WidgetAdapterLoader>;
