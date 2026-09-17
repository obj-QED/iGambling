import { describe, expect, it } from 'vitest';

import { BREAKPOINTS_PX } from '@/assets/theme/breakpoints';
import {
  isMobileOnlyViewport,
  isMobileViewport,
  isTabletViewport,
} from '@/shared/lib/device/isMobileViewport';

const { mobile, tablet } = BREAKPOINTS_PX;

describe('isMobileViewport', () => {
  it('treats mobile widths as mobile', () => {
    expect(isMobileViewport(375)).toBe(true);
    expect(isMobileOnlyViewport(mobile)).toBe(true);
    expect(isTabletViewport(mobile)).toBe(false);
  });

  it('treats tablet widths as mobile for layout chrome', () => {
    expect(isMobileViewport(mobile + 1)).toBe(true);
    expect(isMobileViewport(tablet)).toBe(true);
    expect(isMobileOnlyViewport(mobile + 1)).toBe(false);
    expect(isTabletViewport(mobile + 1)).toBe(true);
    expect(isTabletViewport(tablet)).toBe(true);
  });

  it('treats laptop and above as desktop', () => {
    expect(isMobileViewport(tablet + 1)).toBe(false);
    expect(isMobileViewport(BREAKPOINTS_PX.laptop)).toBe(false);
  });
});
