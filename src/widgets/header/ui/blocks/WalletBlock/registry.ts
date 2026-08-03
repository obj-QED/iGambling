import type { BlockProps } from '../../../types';
import type { ComponentType } from 'react';

import { resolveBlockVariantComponent } from '../../../lib';
import { WalletCompactVariant } from './variants/WalletCompactVariant';
import { WalletDrawerVariant } from './variants/WalletDrawerVariant';
import { WalletFullVariant } from './variants/WalletFullVariant';

export const WALLET_VARIANT_REGISTRY = {
  compact: WalletCompactVariant,
  full: WalletFullVariant,
  drawer: WalletDrawerVariant,
} as const satisfies Record<string, ComponentType<BlockProps>>;

export type WalletBlockVariant = keyof typeof WALLET_VARIANT_REGISTRY;

export function resolveWalletVariantComponent(
  variant: string | undefined,
): ComponentType<BlockProps> {
  return resolveBlockVariantComponent(WALLET_VARIANT_REGISTRY, variant);
}
