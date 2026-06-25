import type { DeviceEnv } from '../deviceEnv.types';

import { describe, expect, it } from 'vitest';

import { buildDeviceBodyClassList } from '../deviceBodyClasses';

const BASE_ENV: DeviceEnv = {
  isMobile: false,
  isMobileOnly: false,
  isTablet: false,
  isIOS: false,
  isAndroid: false,
  browser: 'unknown',
  isFullscreen: false,
};

describe('buildDeviceBodyClassList', () => {
  it('adds mobile, platform, browser, and fullscreen classes', () => {
    expect(
      buildDeviceBodyClassList({
        ...BASE_ENV,
        isMobile: true,
        isIOS: true,
        browser: 'safari',
        isFullscreen: true,
      }),
    ).toEqual(['is-mobile', 'is-ios', 'is-fullscreen', 'is-browser-safari']);
  });

  it('always includes browser class slug', () => {
    expect(buildDeviceBodyClassList(BASE_ENV)).toEqual(['is-browser-unknown']);
  });
});
