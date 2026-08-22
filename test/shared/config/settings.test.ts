import { describe, expect, it } from 'vitest';

import { isScrollFullscreenEnabled, isShellSkeletonEnabled } from '@/shared/config/settings';

describe('isScrollFullscreenEnabled', () => {
  it('is enabled only when params.fullscreen is true', () => {
    expect(isScrollFullscreenEnabled({ params: { fullscreen: true } })).toBe(true);
    expect(isScrollFullscreenEnabled({ params: { fullscreen: false } })).toBe(false);
    expect(isScrollFullscreenEnabled({})).toBe(false);
  });
});

describe('isShellSkeletonEnabled', () => {
  it('defaults on and turns off only when skeleton is false', () => {
    expect(isShellSkeletonEnabled({})).toBe(true);
    expect(isShellSkeletonEnabled({ params: { preloader: { skeleton: true } } })).toBe(true);
    expect(isShellSkeletonEnabled({ params: { preloader: { skeleton: false } } })).toBe(false);
  });
});
