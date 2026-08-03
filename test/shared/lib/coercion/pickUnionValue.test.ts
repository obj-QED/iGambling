import { describe, expect, it } from 'vitest';

import { pickUnionValue } from '@/shared/lib/coercion/pickUnionValue';

const MODES = ['default', 'info'] as const;

describe('pickUnionValue', () => {
  it('returns the value when it is allowed', () => {
    expect(pickUnionValue(MODES, 'info', 'default')).toBe('info');
  });

  it('falls back when value is missing or unknown', () => {
    expect(pickUnionValue(MODES, undefined, 'default')).toBe('default');
    expect(pickUnionValue(MODES, 'classic' as 'default', 'default')).toBe('default');
  });
});
