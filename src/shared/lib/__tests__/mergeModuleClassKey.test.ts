import { describe, expect, it } from 'vitest';

import { mergeModuleClassKey } from '../mergeModuleClassKey';

describe('mergeModuleClassKey', () => {
  it('merges base and variant when variant key is non-empty', () => {
    const base = { root: 'a' };
    const variant = { root: 'b' };
    expect(mergeModuleClassKey(base, variant, 'root')).toBe('a b');
  });

  it('returns base only when variant has no such key', () => {
    const base = { root: 'a', onlyBase: 'x' };
    const variant = { root: 'b' };
    expect(mergeModuleClassKey(base, variant, 'onlyBase')).toBe('x');
  });

  it('returns base only when variant maps key to empty string', () => {
    const base = { root: 'a' };
    const variant = { root: '' };
    expect(mergeModuleClassKey(base, variant, 'root')).toBe('a');
  });
});
