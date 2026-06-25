import { describe, expect, it } from 'vitest';

import { SCROLL_FULLSCREEN_THRESHOLD_PX, shouldRequestScrollFullscreen } from '../scrollFullscreen';

describe('shouldRequestScrollFullscreen', () => {
  it('requires enabled flag, mobile viewport, scroll threshold, and not already fullscreen', () => {
    expect(
      shouldRequestScrollFullscreen({
        enabled: true,
        isMobile: true,
        scrollY: SCROLL_FULLSCREEN_THRESHOLD_PX,
        isFullscreen: false,
      }),
    ).toBe(true);

    expect(
      shouldRequestScrollFullscreen({
        enabled: false,
        isMobile: true,
        scrollY: 100,
        isFullscreen: false,
      }),
    ).toBe(false);

    expect(
      shouldRequestScrollFullscreen({
        enabled: true,
        isMobile: false,
        scrollY: 100,
        isFullscreen: false,
      }),
    ).toBe(false);

    expect(
      shouldRequestScrollFullscreen({
        enabled: true,
        isMobile: true,
        scrollY: 0,
        isFullscreen: false,
      }),
    ).toBe(false);

    expect(
      shouldRequestScrollFullscreen({
        enabled: true,
        isMobile: true,
        scrollY: 100,
        isFullscreen: true,
      }),
    ).toBe(false);
  });
});
