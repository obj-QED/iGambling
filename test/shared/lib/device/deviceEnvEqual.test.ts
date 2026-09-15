import { describe, expect, it } from 'vitest';

import { deviceEnvEqual, type DeviceEnv } from '@/shared/lib/device';

const base: DeviceEnv = {
  isMobile: false,
  isMobileOnly: false,
  isTablet: false,
  isIOS: false,
  isAndroid: false,
  browser: 'chrome',
  isFullscreen: false,
};

describe('deviceEnvEqual', () => {
  it('is true for equal flags despite different object identity', () => {
    expect(deviceEnvEqual(base, { ...base })).toBe(true);
  });

  it('is false when a viewport flag changes', () => {
    expect(deviceEnvEqual(base, { ...base, isMobile: true })).toBe(false);
  });
});
