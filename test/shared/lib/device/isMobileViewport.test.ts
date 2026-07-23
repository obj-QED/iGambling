import { describe, expect, it } from 'vitest';

import { isMobileOnlyViewport, isMobileViewport, isTabletViewport } from '@/shared/lib/device/isMobileViewport';

describe('isMobileViewport', () => {
  it('treats mobile widths as mobile', () => {
    expect(isMobileViewport(375)).toBe(true);
    expect(isMobileOnlyViewport(767)).toBe(true);
    expect(isTabletViewport(767)).toBe(false);
  });

  it('treats tablet widths as mobile for layout chrome', () => {
    expect(isMobileViewport(768)).toBe(true);
    expect(isMobileViewport(1024)).toBe(true);
    expect(isMobileOnlyViewport(768)).toBe(false);
    expect(isTabletViewport(768)).toBe(true);
    expect(isTabletViewport(1024)).toBe(true);
  });

  it('treats laptop and above as desktop', () => {
    expect(isMobileViewport(1025)).toBe(false);
    expect(isMobileViewport(1440)).toBe(false);
  });
});
