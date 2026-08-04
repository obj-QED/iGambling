import { describe, expect, it } from 'vitest';

import { resolveWrapperLoader, WRAPPER_REGISTRY } from '@/shared/ui/overlay/wrapperRegistry';

describe('wrapperRegistry', () => {
  it('exposes loaders for every WrapperMode', () => {
    expect(Object.keys(WRAPPER_REGISTRY).sort()).toEqual(
      ['drawer', 'modal', 'none', 'popover', 'tooltip'].sort(),
    );
  });

  it('resolves known modes and falls back to none', () => {
    expect(resolveWrapperLoader('drawer')).toBe(WRAPPER_REGISTRY.drawer);
    expect(resolveWrapperLoader(undefined)).toBe(WRAPPER_REGISTRY.none);
    expect(resolveWrapperLoader('bogus' as 'drawer')).toBe(WRAPPER_REGISTRY.none);
  });

  it('loads drawer wrapper module', async () => {
    const mod = await WRAPPER_REGISTRY.drawer();
    expect(mod.default.displayName).toBe('DrawerWrapper');
  });
});
