import { describe, expect, it } from 'vitest';

import { mergeModuleClassKey } from '../mergeModuleClassKey';

describe('mergeModuleClassKey', () => {
  it('склеивает base и variant при непустом variant', () => {
    const base = { root: 'a' };
    const variant = { root: 'b' };
    expect(mergeModuleClassKey(base, variant, 'root')).toBe('a b');
  });

  it('возвращает только base, если ключа нет в variant', () => {
    const base = { root: 'a', onlyBase: 'x' };
    const variant = { root: 'b' };
    expect(mergeModuleClassKey(base, variant, 'onlyBase')).toBe('x');
  });

  it('возвращает только base при пустой строке в variant', () => {
    const base = { root: 'a' };
    const variant = { root: '' };
    expect(mergeModuleClassKey(base, variant, 'root')).toBe('a');
  });
});
