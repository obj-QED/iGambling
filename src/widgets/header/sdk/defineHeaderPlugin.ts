import type { ComponentType } from 'react';

/** Lazy adapter module loader — props typed loosely so domain blocks can vary. */
export type HeaderAdapterLoader = () => Promise<{
  // Block props differ per adapter; runtime casts at useAdapter boundary.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ComponentType<any>;
}>;

export type HeaderPluginAdapters = Record<string, HeaderAdapterLoader>;

export type HeaderPlugin = {
  key: string;
  adapters: HeaderPluginAdapters;
  preload?: () => void;
  entity?: string;
};

export function defineHeaderPlugin<T extends HeaderPlugin>(plugin: T): T {
  return plugin;
}

export function registerPlugins(list: HeaderPlugin[]): Record<string, HeaderPlugin> {
  return Object.fromEntries(list.map((plugin) => [plugin.key, plugin]));
}
