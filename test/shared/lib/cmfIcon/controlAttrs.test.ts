import { describe, expect, it } from 'vitest';

import { cmfIconControlAttrs } from '@/shared/lib/cmfIcon/controlAttrs';

describe('cmfIconControlAttrs', () => {
  it('never puts data-cmf-icon-src on controls (media-only attr)', () => {
    expect(cmfIconControlAttrs('/uploads/icon.svg', true)).toEqual({});
    expect(cmfIconControlAttrs('/uploads/icon.png', true)).toEqual({});
    expect(cmfIconControlAttrs('/uploads/icon.svg', false)).toEqual({});
    expect(cmfIconControlAttrs(undefined, true)).toEqual({});
  });
});
