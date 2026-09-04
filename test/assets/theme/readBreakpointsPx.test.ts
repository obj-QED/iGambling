import { afterEach, describe, expect, it, vi } from 'vitest';

import { BREAKPOINTS_PX } from '@/assets/theme/breakpoints';
import { parseBreakpointPx, readBreakpointsPx } from '@/assets/theme/readBreakpointsPx';

describe('parseBreakpointPx', () => {
  it('parses px and bare numbers', () => {
    expect(parseBreakpointPx('767px')).toBe(767);
    expect(parseBreakpointPx(' 1024 ')).toBe(1024);
    expect(parseBreakpointPx('')).toBeNull();
    expect(parseBreakpointPx('auto')).toBeNull();
  });
});

describe('readBreakpointsPx', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('falls back to BREAKPOINTS_PX without a root', () => {
    expect(readBreakpointsPx(null)).toEqual({ ...BREAKPOINTS_PX });
  });

  it('prefers theme CSS vars when present', () => {
    const root = document.createElement('div');
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (name: string) => {
        if (name === '--breakpoint-mobile') return '500px';
        if (name === '--breakpoint-tablet') return '900px';
        if (name === '--breakpoint-laptop') return '1300px';
        if (name === '--breakpoint-pc') return '1301px';
        return '';
      },
    } as CSSStyleDeclaration);

    expect(readBreakpointsPx(root)).toEqual({
      mobile: 500,
      tablet: 900,
      laptop: 1300,
      pc: 1301,
    });
  });

  it('keeps fallback per missing var', () => {
    const root = document.createElement('div');
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (name: string) => (name === '--breakpoint-tablet' ? '1100px' : ''),
    } as CSSStyleDeclaration);

    expect(readBreakpointsPx(root)).toEqual({
      ...BREAKPOINTS_PX,
      tablet: 1100,
    });
  });
});
