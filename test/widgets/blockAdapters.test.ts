import { describe, expect, it } from 'vitest';

import {
  SEARCH_ADAPTER_KEYS,
  SEARCH_ADAPTERS,
} from '@/widgets/header/ui/blocks/SearchBlock/adapters';
import {
  WALLET_ADAPTER_KEYS,
  WALLET_ADAPTERS,
} from '@/widgets/header/ui/blocks/WalletBlock/adapters';
import {
  PROMO_ADAPTER_KEYS,
  PROMO_ADAPTERS,
} from '@/widgets/sidebar/ui/blocks/PromoBlock/adapters';
import {
  SEARCH_ADAPTER_KEYS as SIDEBAR_SEARCH_KEYS,
  SEARCH_ADAPTERS as SIDEBAR_SEARCH,
} from '@/widgets/sidebar/ui/blocks/Search/adapters';

describe('block adapters maps', () => {
  it('header search/wallet expose expected keys', () => {
    expect([...SEARCH_ADAPTER_KEYS]).toEqual(['compact', 'input']);
    expect(Object.keys(SEARCH_ADAPTERS)).toEqual(['compact', 'input']);
    expect([...WALLET_ADAPTER_KEYS]).toEqual(['compact', 'full']);
    expect(Object.keys(WALLET_ADAPTERS)).toEqual(['compact', 'full']);
  });

  it('sidebar search/promo expose expected keys', () => {
    expect([...SIDEBAR_SEARCH_KEYS]).toEqual(['row', 'icon']);
    expect(Object.keys(SIDEBAR_SEARCH)).toEqual(['row', 'icon']);
    expect([...PROMO_ADAPTER_KEYS]).toEqual(['row', 'icon']);
    expect(Object.keys(PROMO_ADAPTERS)).toEqual(['row', 'icon']);
  });
});
