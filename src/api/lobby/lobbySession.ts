import { isRecord } from '@shared/lib';

function isNonEmptyTrimmedString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function extractLobbyToken(value: unknown): string | null {
  if (!isRecord(value)) return null;
  const top = value.token;
  if (isNonEmptyTrimmedString(top)) return top.trim();
  const page = value.page;
  if (isRecord(page)) {
    const nested = page.token;
    if (isNonEmptyTrimmedString(nested)) return nested.trim();
  }
  return null;
}

function hasUserRecordId(user: unknown): boolean {
  return isRecord(user) && user.id !== undefined && user.id !== null;
}

function hasPageAuthSignals(page: unknown): boolean {
  if (!isRecord(page)) return false;
  if (extractLobbyToken(page) != null) return true;
  if (page.id !== undefined && page.id !== null) return true;
  return hasUserRecordId(page.user);
}

export function hasAuthIdentity(value: unknown): boolean {
  if (!isRecord(value)) return false;
  if (extractLobbyToken(value) != null) return true;
  const hasId = value.id !== undefined && value.id !== null;
  if (hasId) return true;
  if (hasUserRecordId(value.user)) return true;
  return hasPageAuthSignals(value.page);
}

function readSettingsLobbyToken(): string | null {
  if (typeof globalThis === 'undefined') return null;
  const settings = (globalThis as { __SETTINGS__?: { lobbyToken?: string } }).__SETTINGS__;
  const token = settings?.lobbyToken;
  if (isNonEmptyTrimmedString(token)) return token.trim();
  return null;
}

/** In-memory lobby token from last initV2 (not persisted; not in Redux). */
let memoryToken: string | null = null;

/** Bumps on session changes so TanStack keys can invalidate without embedding secrets. */
let sessionRevision = 0;

const listeners = new Set<() => void>();

function emit(): void {
  sessionRevision += 1;
  for (const listener of listeners) {
    listener();
  }
}

export function getLobbySessionRevision(): number {
  return sessionRevision;
}

export function subscribeLobbySession(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Snapshot for `useSyncExternalStore`: memory token from init, else optional bootstrap
 * `window.__SETTINGS__.lobbyToken` (server-injected HTML).
 */
export function getLobbySessionTokenSnapshot(): string | null {
  if (memoryToken != null) return memoryToken;
  return readSettingsLobbyToken();
}

const IS_DEV = import.meta.env.DEV;

/**
 * Development only: set in-memory lobby token before `prefetchInitData` / `initV2`.
 * No-op in production. Prefer `VITE_DEV_LOBBY_TOKEN` in `.env.local` for a stable value.
 */
export function setLobbySessionDevToken(token: string | null | undefined): void {
  if (!IS_DEV) return;
  if (token == null || token.trim() === '') {
    memoryToken = null;
  } else {
    memoryToken = token.trim();
  }
  emit();
}

/** Clears init-derived token (call on logout when you clear server session). */
export function clearLobbySession(): void {
  memoryToken = null;
  emit();
}

/**
 * After initV2: persist token in memory when present; clear memory only when payload
 * clearly has no authenticated identity (guest / logged out).
 */
export function applyLobbySessionFromInitContent(content: unknown): void {
  const next = extractLobbyToken(content);
  if (next != null) {
    memoryToken = next;
    emit();
    return;
  }
  if (!hasAuthIdentity(content)) {
    memoryToken = null;
    emit();
  }
}
