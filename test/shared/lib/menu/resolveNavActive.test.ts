import { describe, expect, it } from 'vitest';

import { matchInternalAppPath, resolveMenuActive } from '@/shared/lib/menu/resolveMenuActive';

describe('resolveMenuActive', () => {
  it('returns explicit active flag when set', () => {
    expect(resolveMenuActive({ url: '/games', active: true }, '/home')).toBe(true);
    expect(resolveMenuActive({ url: '/games', active: false }, '/games')).toBe(false);
  });

  it('matches internal url to pathname', () => {
    expect(resolveMenuActive({ url: '/games' }, '/games')).toBe(true);
    expect(resolveMenuActive({ url: '/games' }, '/promo')).toBe(false);
  });

  it('skips URL match when matchRoute is false', () => {
    expect(resolveMenuActive({ url: '/games', matchRoute: false }, '/games')).toBe(false);
  });

  it('supports prefix matching', () => {
    expect(resolveMenuActive({ url: '/games', activeMatch: 'prefix' }, '/games/slots')).toBe(
      true,
    );
  });

  it('ignores external and invalid hrefs', () => {
    expect(resolveMenuActive({ url: 'https://x.com' }, '/')).toBe(false);
    expect(resolveMenuActive({ url: '' }, '/')).toBe(false);
  });
});

describe('matchInternalAppPath', () => {
  it('normalizes trailing slashes for exact match', () => {
    expect(matchInternalAppPath('/games/', '/games')).toBe(true);
  });
});
