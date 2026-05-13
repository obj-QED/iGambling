import { describe, expect, it } from 'vitest';

import { extractLobbyToken } from './extractLobbyToken';
import { hasAuthIdentity } from './guards';

describe('extractLobbyToken', () => {
  it('reads token from root', () => {
    expect(extractLobbyToken({ token: '  a_b  ', page: {} })).toBe('a_b');
  });

  it('reads token from nested page', () => {
    expect(extractLobbyToken({ page: { token: 't1' } })).toBe('t1');
  });

  it('returns null when absent', () => {
    expect(extractLobbyToken({ page: {} })).toBeNull();
  });
});

describe('hasAuthIdentity', () => {
  it('is true when root token is present', () => {
    expect(hasAuthIdentity({ token: '1383_x' })).toBe(true);
  });

  it('is true when page token is present', () => {
    expect(hasAuthIdentity({ page: { token: '1383_x' } })).toBe(true);
  });

  it('is true when page has user id', () => {
    expect(hasAuthIdentity({ page: { user: { id: 1 } } })).toBe(true);
  });

  it('is false for empty guest payload', () => {
    expect(hasAuthIdentity({ page: { blocks: [] } })).toBe(false);
  });
});
