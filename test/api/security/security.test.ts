import { describe, expect, it } from 'vitest';

import { assertLobbyCommand, assertSafeRequestUrl, redactSecrets } from '@/api/security';

describe('assertLobbyCommand', () => {
  it('allows known lobby commands', () => {
    expect(assertLobbyCommand('initV2')).toBe('initV2');
    expect(assertLobbyCommand('getPage')).toBe('getPage');
    expect(assertLobbyCommand('translation')).toBe('translation');
  });

  it('rejects admin, SQL-like, and fake webhook commands', () => {
    for (const cmd of ['DROP TABLE', 'admin', 'webhook', 'exec', 'initV2; delete']) {
      expect(() => assertLobbyCommand(cmd)).toThrow(/not allowed/);
    }
  });
});

describe('redactSecrets', () => {
  it('redacts token and bot_token fields', () => {
    expect(
      redactSecrets({
        language: 'en',
        token: 'secret-lobby',
        nested: { bot_token: 'bot-secret', ok: 1 },
      }),
    ).toEqual({
      language: 'en',
      token: '[REDACTED]',
      nested: { bot_token: '[REDACTED]', ok: 1 },
    });
  });
});

describe('assertSafeRequestUrl', () => {
  it('allows relative lobby path', () => {
    expect(() => {
      assertSafeRequestUrl('/apiLobby.php');
    }).not.toThrow();
  });

  it('blocks protocol-relative URLs', () => {
    expect(() => {
      assertSafeRequestUrl('//evil.example/api');
    }).toThrow(/Protocol-relative/);
  });
});
