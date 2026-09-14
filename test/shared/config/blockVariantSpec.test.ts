import { describe, expect, it } from 'vitest';

import {
  flattenBlockVariantSettings,
  mapAsideSearchStyle,
  mapHeaderSearchStyle,
  readBlockVariantSpec,
} from '@/shared/config';

describe('blockVariantSpec / search style maps', () => {
  it('reads string as style; overlay names as type', () => {
    expect(readBlockVariantSpec('input')).toEqual({ style: 'input' });
    expect(readBlockVariantSpec('modal')).toEqual({ type: 'modal', style: 'compact' });
    expect(readBlockVariantSpec({ type: 'spotlight', style: 'icon' })).toEqual({
      type: 'spotlight',
      style: 'icon',
    });
  });

  it('flattens type/style into variants + wrappers + behaviors', () => {
    const flat = flattenBlockVariantSettings(
      {
        search: { type: 'modal', style: 'input' },
        search_leftmenu: { type: 'input', style: 'icon' },
      },
      {},
      {
        aliases: { search_leftmenu: 'search' },
        mapStyle: (_domain, style) => mapAsideSearchStyle(style),
      },
    );

    // Domain key `search` wins over alias when both present.
    expect(flat.variants.search).toBe('row');
    expect(flat.wrappers.search).toBe('modal');
    expect(flat.behaviors.search).toBe('modal');
  });

  it('maps spotlight type to none wrapper and keeps behavior', () => {
    const flat = flattenBlockVariantSettings({
      search: { type: 'spotlight', style: 'compact' },
    });
    expect(flat.variants.search).toBe('compact');
    expect(flat.wrappers.search).toBe('none');
    expect(flat.behaviors.search).toBe('spotlight');
  });

  it('maps header search styles onto compact|input', () => {
    expect(mapHeaderSearchStyle('icon')).toBe('compact');
    expect(mapHeaderSearchStyle('button')).toBe('input');
  });
});
