import { SEARCH_ADAPTER_KEYS } from './adapters';

/** Storybook / docs — adapter keys only (overlays via schema.wrappers). */
export const SEARCH_VARIANT_REGISTRY = Object.fromEntries(
  SEARCH_ADAPTER_KEYS.map((key) => [key, key]),
) as Record<(typeof SEARCH_ADAPTER_KEYS)[number], string>;

export const SEARCH_VARIANT_KEYS = SEARCH_ADAPTER_KEYS;
export type SearchBlockVariant = (typeof SEARCH_ADAPTER_KEYS)[number];

export { SEARCH_ADAPTER_KEYS };
