import { describe, expect, it } from 'vitest';

import { isScrollFullscreenEnabled } from '@/shared/config/settings';

describe('isScrollFullscreenEnabled', () => {
  it('is enabled only when params.fullscreen is true', () => {
    expect(isScrollFullscreenEnabled({ params: { fullscreen: true } })).toBe(true);
    expect(isScrollFullscreenEnabled({ params: { fullscreen: false } })).toBe(false);
    expect(isScrollFullscreenEnabled({})).toBe(false);
  });
});
