import { describe, expect, it } from 'vitest';

import { pluginRegistry } from '@/widgets/header/plugins';
import { defineHeaderPlugin, registerPlugins } from '@/widgets/header/sdk';

describe('header plugins', () => {
  it('registers wallet and search plugins', () => {
    expect(pluginRegistry.wallet.key).toBe('wallet');
    expect(pluginRegistry.search.key).toBe('search');
    expect(Object.keys(pluginRegistry.wallet.adapters)).toEqual(['compact', 'full']);
    expect(Object.keys(pluginRegistry.search.adapters)).toEqual(['compact', 'input']);
  });

  it('defineHeaderPlugin + registerPlugins build a map', () => {
    const demo = defineHeaderPlugin({
      key: 'demo',
      adapters: {
        compact: async () => ({ default: () => null }),
      },
    });
    expect(registerPlugins([demo])).toEqual({ demo });
  });
});
