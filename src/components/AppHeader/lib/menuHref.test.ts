import { describe, expect, it } from 'vitest';

import { hasMenuItemUrl, isNavigableMenuHref } from './menuHref';

describe('hasMenuItemUrl', () => {
  it('is false for empty, whitespace, or undefined', () => {
    expect(hasMenuItemUrl(undefined)).toBe(false);
    expect(hasMenuItemUrl('')).toBe(false);
    expect(hasMenuItemUrl('   ')).toBe(false);
  });

  it('is true for non-empty trimmed url', () => {
    expect(hasMenuItemUrl('wallet')).toBe(true);
    expect(hasMenuItemUrl(' /x ')).toBe(true);
  });
});

describe('isNavigableMenuHref', () => {
  it('rejects empty, hash placeholders, and invalid kinds', () => {
    expect(isNavigableMenuHref(undefined)).toBe(false);
    expect(isNavigableMenuHref('')).toBe(false);
    expect(isNavigableMenuHref('#')).toBe(false);
    expect(isNavigableMenuHref('/#')).toBe(false);
    expect(isNavigableMenuHref('not-a-url')).toBe(false);
  });

  it('accepts backend internal and external URLs as-is', () => {
    expect(isNavigableMenuHref('/profile')).toBe(true);
    expect(isNavigableMenuHref('/profile?tab=deposit')).toBe(true);
    expect(isNavigableMenuHref('https://x.com')).toBe(true);
  });

  it('rejects protocol-relative paths', () => {
    expect(isNavigableMenuHref('//evil.example')).toBe(false);
  });
});
