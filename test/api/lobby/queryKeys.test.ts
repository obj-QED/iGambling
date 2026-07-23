import { describe, expect, it } from 'vitest';

import { lobbyQueryKeys } from '@/api/lobby/queryKeys';

describe('lobbyQueryKeys.page', () => {
  it('does not embed credentials — only language, path, and session revision', () => {
    const key = lobbyQueryKeys.page('en', '/promo', 3);
    expect(key).toEqual(['lobby', 'page', 'en', '/promo', 3]);
    expect(key.some((part) => typeof part === 'string' && part.includes('secret-token'))).toBe(false);
  });
});
