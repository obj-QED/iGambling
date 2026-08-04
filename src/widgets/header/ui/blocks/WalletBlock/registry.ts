import { WALLET_ADAPTER_KEYS } from '../../../plugins/wallet';

/** Storybook / docs — adapter keys only (overlays via schema.wrappers). */
export const WALLET_VARIANT_REGISTRY = Object.fromEntries(
  WALLET_ADAPTER_KEYS.map((key) => [key, key]),
) as Record<(typeof WALLET_ADAPTER_KEYS)[number], string>;

export const WALLET_VARIANT_KEYS = WALLET_ADAPTER_KEYS;
export type WalletBlockVariant = (typeof WALLET_ADAPTER_KEYS)[number];

export { WALLET_ADAPTER_KEYS };
