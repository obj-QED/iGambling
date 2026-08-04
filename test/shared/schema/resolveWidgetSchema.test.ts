import { describe, expect, it, vi } from 'vitest';

import { filterKeysByCapabilities, isCapabilityEnabled } from '@/shared/schema/capabilities';
import { deepMerge, mergeSchemaLayers } from '@/shared/schema/mergeLayers';
import { resolveWidgetSchema } from '@/shared/schema/resolveSchema';

describe('deepMerge / mergeSchemaLayers', () => {
  it('applies defaults → global → brand → page → props', () => {
    const defaults = {
      version: 1 as const,
      capabilities: { a: true },
      layout: 'container',
      gap: 8,
    };
    const merged = mergeSchemaLayers(defaults, {
      global: { layout: 'fluid', gap: 12 },
      brand: { gap: 16 },
      page: { layout: 'page' },
      props: { gap: 24 },
    });

    expect(merged).toEqual({
      version: 1,
      capabilities: { a: true },
      layout: 'page',
      gap: 24,
    });
  });

  it('skips undefined layers and undefined overlay values', () => {
    expect(
      mergeSchemaLayers(
        { version: 1 as const, capabilities: {}, x: 1 },
        { brand: undefined, props: { x: undefined } },
      ),
    ).toEqual({ version: 1, capabilities: {}, x: 1 });
  });

  it('deep-merges nested plain objects and replaces arrays', () => {
    expect(
      deepMerge(
        { wrappers: { wallet: 'none', search: 'none' }, slots: ['a'] },
        { wrappers: { wallet: 'drawer', search: 'none' }, slots: ['b'] },
      ),
    ).toEqual({ wrappers: { wallet: 'drawer', search: 'none' }, slots: ['b'] });
  });
});

describe('capabilities', () => {
  it('filterKeysByCapabilities keeps only explicit true', () => {
    expect(
      filterKeysByCapabilities(['search', 'wallet', 'logo'] as const, {
        search: true,
        wallet: false,
      }),
    ).toEqual(['search']);
  });

  it('isCapabilityEnabled defaults to true when unset', () => {
    expect(isCapabilityEnabled({}, 'wallet')).toBe(true);
    expect(isCapabilityEnabled({ wallet: false }, 'wallet')).toBe(false);
  });
});

describe('resolveWidgetSchema', () => {
  const defaults = {
    version: 1 as const,
    capabilities: { search: true },
    layout: 'container',
  };

  it('merges layers and keeps supported version', () => {
    expect(
      resolveWidgetSchema(defaults, {
        global: { layout: 'classic' },
        props: { version: 1 },
      }),
    ).toEqual({
      version: 1,
      capabilities: { search: true },
      layout: 'classic',
    });
  });

  it('falls back to defaults on unsupported version', () => {
    const onUnsupported = vi.fn();
    const result = resolveWidgetSchema(
      defaults,
      { global: { version: 99 as 1, layout: 'x' } },
      { supportedVersions: [1], onUnsupportedVersion: onUnsupported },
    );

    expect(onUnsupported).toHaveBeenCalledWith(99);
    expect(result).toEqual(defaults);
  });

  it('runs coerce after successful merge', () => {
    expect(
      resolveWidgetSchema(
        defaults,
        { global: { layout: 'raw' } },
        {
          coerce: (merged) => ({ ...merged, layout: merged.layout.toUpperCase() }),
        },
      ),
    ).toEqual({
      version: 1,
      capabilities: { search: true },
      layout: 'RAW',
    });
  });
});
