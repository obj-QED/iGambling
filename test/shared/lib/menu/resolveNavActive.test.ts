import { describe, expect, it } from 'vitest';

import { matchInternalAppPath, resolveNavActive } from '@/shared/lib/menu/resolveNavActive';

describe('resolveNavActive', () => {
  it('returns explicit active flag when set', () => {
    expect(resolveNavActive({ url: '/games', active: true }, '/home')).toBe(true);
    expect(resolveNavActive({ url: '/games', active: false }, '/games')).toBe(false);
  });

  it('matches internal url to pathname', () => {
    expect(resolveNavActive({ url: '/games' }, '/games')).toBe(true);
    expect(resolveNavActive({ url: '/games' }, '/promo')).toBe(false);
  });

  it('skips URL match when matchRoute is false', () => {
    expect(resolveNavActive({ url: '/games', matchRoute: false }, '/games')).toBe(false);
  });

  it('supports prefix matching', () => {
    expect(resolveNavActive({ url: '/games', activeMatch: 'prefix' }, '/games/slots')).toBe(true);
  });

  it('ignores external and invalid hrefs', () => {
    expect(resolveNavActive({ url: 'https://x.com' }, '/')).toBe(false);
    expect(resolveNavActive({ url: '' }, '/')).toBe(false);
  });
});

describe('matchInternalAppPath', () => {
  it('normalizes trailing slashes for exact match', () => {
    expect(matchInternalAppPath('/games/', '/games')).toBe(true);
  });
});
