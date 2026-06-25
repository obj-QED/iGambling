import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { applyLobbySessionFromInitContent, clearLobbySession, getLobbySessionTokenSnapshot } from './lobbySession';

describe('lobbySession', () => {
  beforeEach(() => {
    clearLobbySession();
  });

  afterEach(() => {
    clearLobbySession();
  });

  it('stores token from init content in memory', () => {
    applyLobbySessionFromInitContent({ token: '1383_abc', page: {} });
    expect(getLobbySessionTokenSnapshot()).toBe('1383_abc');
  });

  it('clears memory when payload has no identity', () => {
    applyLobbySessionFromInitContent({ token: '1383_abc', page: {} });
    applyLobbySessionFromInitContent({ page: {} });
    expect(getLobbySessionTokenSnapshot()).toBeNull();
  });

  it('does not clear memory when user id remains on page without token', () => {
    applyLobbySessionFromInitContent({ token: '1383_abc', page: {} });
    applyLobbySessionFromInitContent({ page: { user: { id: 1 } } });
    expect(getLobbySessionTokenSnapshot()).toBe('1383_abc');
  });
});
