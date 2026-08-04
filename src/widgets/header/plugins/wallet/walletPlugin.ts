import { defineHeaderPlugin } from '../../sdk';

export const WALLET_ADAPTER_KEYS = ['compact', 'full'] as const;
export type WalletAdapterKey = (typeof WALLET_ADAPTER_KEYS)[number];

export const walletPlugin = defineHeaderPlugin({
  key: 'wallet',
  adapters: {
    compact: () =>
      import('../../ui/blocks/WalletBlock/variants/WalletCompactVariant').then((m) => ({
        default: m.WalletCompactVariant,
      })),
    full: () =>
      import('../../ui/blocks/WalletBlock/variants/WalletFullVariant').then((m) => ({
        default: m.WalletFullVariant,
      })),
  },
  preload: () => {
    void import('../../ui/blocks/WalletBlock/variants/WalletCompactVariant');
  },
  entity: 'wallet',
});
