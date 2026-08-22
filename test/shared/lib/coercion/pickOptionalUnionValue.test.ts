import { describe, expect, it } from 'vitest';

import { pickOptionalUnionValue } from '@/shared/lib/coercion/pickOptionalUnionValue';

const MODES = ['compact', 'input'] as const;

describe('pickOptionalUnionValue', () => {
  it('returns the value when it is allowed', () => {
    expect(pickOptionalUnionValue(MODES, 'input')).toBe('input');
  });

  it('returns undefined when value is missing or unknown', () => {
    expect(pickOptionalUnionValue(MODES, undefined)).toBeUndefined();
    expect(pickOptionalUnionValue(MODES, 'mega')).toBeUndefined();
  });
});
