/** Lobby `cmd` values the SPA may send. Anything else is rejected client-side. */
export const LOBBY_ALLOWED_COMMANDS = ['initV2', 'getPage', 'translation'] as const;

export type LobbyAllowedCommand = (typeof LOBBY_ALLOWED_COMMANDS)[number];

const ALLOWED = new Set<string>(LOBBY_ALLOWED_COMMANDS);

/**
 * Reject user-/admin-/webhook-style command strings before they reach the wire.
 * Backend must still enforce the same allowlist — frontend is defense-in-depth only.
 */
export function assertLobbyCommand(cmd: string): LobbyAllowedCommand {
  if (!ALLOWED.has(cmd)) {
    throw new Error(`[security] Lobby command not allowed: ${cmd}`);
  }
  return cmd as LobbyAllowedCommand;
}
