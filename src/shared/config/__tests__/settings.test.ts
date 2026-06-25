import { describe, expect, it } from 'vitest';

import { isScrollFullscreenEnabled } from '../settings';

describe('isScrollFullscreenEnabled', () => {
  it('is enabled only when params.fullWidth is true', () => {
    expect(isScrollFullscreenEnabled({ params: { fullWidth: true } })).toBe(true);
    expect(isScrollFullscreenEnabled({ params: { fullWidth: false } })).toBe(false);
    expect(isScrollFullscreenEnabled({})).toBe(false);
  });
});
