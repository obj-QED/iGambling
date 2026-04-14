import { describe, expect, it } from 'vitest';

import { getAppHrefKind } from '../resolveAppHref';

describe('getAppHrefKind', () => {
  it('classifies hrefs', () => {
    expect(getAppHrefKind('')).toBe('invalid');
    expect(getAppHrefKind('https://example.com')).toBe('external');
    expect(getAppHrefKind('/games')).toBe('internal');
    expect(getAppHrefKind('relative-no-slash')).toBe('invalid');
  });
});
