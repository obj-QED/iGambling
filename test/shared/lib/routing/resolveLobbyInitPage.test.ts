import { describe, expect, it } from 'vitest';

import { resolveLobbyInitPage } from '@/shared/lib/routing/resolveLobbyInitPage';

describe('resolveLobbyInitPage', () => {
  it('keeps lobby paths', () => {
    expect(resolveLobbyInitPage('/')).toBe('/');
    expect(resolveLobbyInitPage('/casino')).toBe('/casino');
  });

  it('maps SPA shell routes to / for initV2', () => {
    expect(resolveLobbyInitPage('/auth')).toBe('/');
    expect(resolveLobbyInitPage('/register')).toBe('/');
    expect(resolveLobbyInitPage('/profile/activation')).toBe('/');
    expect(resolveLobbyInitPage('/404')).toBe('/');
    expect(resolveLobbyInitPage('/500')).toBe('/');
  });
});
