import { describe, expect, it } from 'vitest';

import { isNonEmptyArray } from '@/shared/lib';

describe('isNonEmptyArray', () => {
  it('accepts arrays with items', () => {
    expect(isNonEmptyArray(['a'])).toBe(true);
  });

  it('rejects empty, null, and undefined', () => {
    expect(isNonEmptyArray([])).toBe(false);
    expect(isNonEmptyArray(undefined)).toBe(false);
    expect(isNonEmptyArray(null)).toBe(false);
  });
});
