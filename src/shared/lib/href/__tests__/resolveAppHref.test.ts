import { describe, expect, it } from 'vitest';

import { getAppHrefKind, isValidAppHref, resolveItemHref } from '../resolveAppHref';

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
  });

  it('rejects protocol-relative and empty-hash root paths', () => {
    expect(getAppHrefKind('//evil.example')).toBe('invalid');
    expect(getAppHrefKind('/#')).toBe('invalid');
  });
});

describe('resolveItemHref', () => {
  it('returns backend url as-is', () => {
    expect(resolveItemHref('/games')).toBe('/games');
    expect(resolveItemHref('games')).toBe('games');
    expect(resolveItemHref(' https://x ')).toBe(' https://x ');
    expect(resolveItemHref(undefined)).toBe('');
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
