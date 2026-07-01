import { describe, expect, it } from 'vitest';

import { cmfIconControlAttrs } from '../controlAttrs';

describe('cmfIconControlAttrs', () => {
  it('adds data-cmf-icon-src for visible svg icons', () => {
    expect(cmfIconControlAttrs('/uploads/icon.svg', true)).toEqual({
      'data-cmf-icon-src': '/uploads/icon.svg',
    });
  });

  it('skips raster images and hidden icons', () => {
    expect(cmfIconControlAttrs('/uploads/icon.png', true)).toEqual({});
    expect(cmfIconControlAttrs('/uploads/icon.svg', false)).toEqual({});
    expect(cmfIconControlAttrs(undefined, true)).toEqual({});
  });
});
