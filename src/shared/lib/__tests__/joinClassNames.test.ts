import { describe, expect, it } from 'vitest';

import { joinClassNames } from '../joinClassNames';

describe('joinClassNames', () => {
  it('склеивает непустые части', () => {
    expect(joinClassNames('a', 'b')).toBe('a b');
  });

  it('пропускает undefined, null, false и пустые строки', () => {
    expect(joinClassNames('a', undefined, '', false, 'b')).toBe('a b');
  });
});
