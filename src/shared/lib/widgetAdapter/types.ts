import type { ComponentType } from 'react';

/** Lazy adapter module loader — default export is the variant component. */
export type WidgetAdapterLoader<TProps = unknown> = () => Promise<{
  default: ComponentType<TProps>;
}>;

/** Variant key → loader. Keys must match schema `blockVariants` unions. */
export type AdapterRegistry<TVariant extends string, TProps> = Record<
  TVariant,
  WidgetAdapterLoader<TProps>
>;

/** @deprecated Prefer `AdapterRegistry<TVariant, TProps>` */
export type WidgetAdapters<TVariant extends string = string, TProps = unknown> = AdapterRegistry<
  TVariant,
  TProps
>;
