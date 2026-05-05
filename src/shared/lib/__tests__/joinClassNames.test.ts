import { describe, expect, it } from 'vitest';

import { joinClassNames } from '../joinClassNames';

describe('joinClassNames', () => {
  it('joins non-empty parts', () => {
    expect(joinClassNames('a', 'b')).toBe('a b');
  });

  it('skips undefined, null, false, and empty strings', () => {
    expect(joinClassNames('a', undefined, '', false, 'b')).toBe('a b');
  });
});
