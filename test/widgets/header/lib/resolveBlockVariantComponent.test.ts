import { describe, expect, it } from 'vitest';

import { resolveBlockVariantComponent } from '@/widgets/header/lib/resolveBlockVariantComponent';
import {
  resolveSearchVariantComponent,
  SEARCH_VARIANT_REGISTRY,
} from '@/widgets/header/ui/blocks/SearchBlock/registry';
import {
  resolveWalletVariantComponent,
  WALLET_VARIANT_REGISTRY,
} from '@/widgets/header/ui/blocks/WalletBlock/registry';

describe('resolveBlockVariantComponent', () => {
  it('uses registered variant when present', () => {
    expect(resolveSearchVariantComponent('modal')).toBe(SEARCH_VARIANT_REGISTRY.modal);
    expect(resolveWalletVariantComponent('drawer')).toBe(WALLET_VARIANT_REGISTRY.drawer);
  });

  it('falls back to compact for unknown or empty', () => {
    expect(resolveSearchVariantComponent(undefined)).toBe(SEARCH_VARIANT_REGISTRY.compact);
    expect(resolveSearchVariantComponent('')).toBe(SEARCH_VARIANT_REGISTRY.compact);
    expect(resolveSearchVariantComponent('not-a-variant')).toBe(SEARCH_VARIANT_REGISTRY.compact);
    expect(resolveWalletVariantComponent('modal')).toBe(WALLET_VARIANT_REGISTRY.compact);
  });

  it('maps search compact/icon to the same adapter', () => {
    expect(resolveSearchVariantComponent('compact')).toBe(SEARCH_VARIANT_REGISTRY.icon);
    expect(resolveSearchVariantComponent('icon')).toBe(SEARCH_VARIANT_REGISTRY.compact);
  });

  it('falls back to first entry when compact missing', () => {
    const only = { full: WALLET_VARIANT_REGISTRY.full };
    expect(resolveBlockVariantComponent(only, 'nope')).toBe(only.full);
  });
});
