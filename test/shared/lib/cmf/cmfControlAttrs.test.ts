import { describe, expect, it } from 'vitest';

import { cmfControlAttrs } from '@/shared/lib/cmf';

describe('cmfControlAttrs', () => {
  it('sets only provided non-empty fields', () => {
    expect(cmfControlAttrs({ component: 'sidebar', key: 'home', role: 'parent' })).toEqual({
      'data-cmf-component': 'sidebar',
      'data-cmf-key': 'home',
      'data-cmf-role': 'parent',
    });
    expect(cmfControlAttrs({ component: 'header' })).toEqual({
      'data-cmf-component': 'header',
    });
    expect(cmfControlAttrs({ key: '  ', role: '' })).toEqual({});
    expect(cmfControlAttrs()).toEqual({});
  });
});
