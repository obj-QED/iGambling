import { describe, expect, it } from 'vitest';

import { getAppHrefKind, isValidAppHref } from '../resolveAppHref';

describe('getAppHrefKind', () => {
  it('classifies hrefs', () => {
    expect(getAppHrefKind('')).toBe('invalid');
    expect(getAppHrefKind('https://example.com')).toBe('external');
    expect(getAppHrefKind('/games')).toBe('internal');
    expect(getAppHrefKind('relative-no-slash')).toBe('invalid');
  });

  it('classifies same-page hash targets', () => {
    expect(getAppHrefKind('#')).toBe('invalid');
    expect(getAppHrefKind('#about')).toBe('hash');
    expect(getAppHrefKind(' #promo ')).toBe('hash');
  });

  it('rejects protocol-relative and empty-hash root paths', () => {
    expect(getAppHrefKind('//evil.example')).toBe('invalid');
    expect(getAppHrefKind('/#')).toBe('invalid');
  });
});

describe('isValidAppHref', () => {
  it('mirrors non-invalid kinds', () => {
    expect(isValidAppHref('/x')).toBe(true);
    expect(isValidAppHref('#x')).toBe(true);
    expect(isValidAppHref('https://a')).toBe(true);
    expect(isValidAppHref('')).toBe(false);
    expect(isValidAppHref('#')).toBe(false);
    expect(isValidAppHref('rel')).toBe(false);
  });
});
