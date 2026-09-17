import { describe, expect, it } from 'vitest';

import { resolveSidebarRailMedia } from '@/widgets/sidebar/lib';

describe('resolveSidebarRailMedia', () => {
  it('defaults to img when present', () => {
    expect(resolveSidebarRailMedia({ key: 'home', name: 'Home', img: '/x.svg' }, true)).toBe('img');
  });

  it('defaults to glyph for known keys without img', () => {
    expect(resolveSidebarRailMedia({ key: 'logout', name: 'Logout' }, false)).toBe('glyph');
  });

  it('defaults to initial when no img and unknown key', () => {
    expect(resolveSidebarRailMedia({ key: 'promo', name: 'Bonus' }, false)).toBe('initial');
  });

  it('honors railMedia glyph over img', () => {
    expect(
      resolveSidebarRailMedia(
        { key: 'account', name: 'Player', img: '/a.webp', railMedia: 'glyph' },
        true,
      ),
    ).toBe('glyph');
  });

  it('honors railMedia initial over img', () => {
    expect(
      resolveSidebarRailMedia(
        { key: 'home', name: 'Home', img: '/a.webp', railMedia: 'initial' },
        true,
      ),
    ).toBe('initial');
  });

  it('falls through when override cannot be satisfied', () => {
    expect(resolveSidebarRailMedia({ key: 'home', name: 'Home', railMedia: 'glyph' }, false)).toBe(
      'initial',
    );
  });
});
