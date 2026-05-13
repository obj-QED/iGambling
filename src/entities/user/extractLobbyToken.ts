import { isRecord } from '@shared/lib';

/** Reads lobby session token from initV2-style payloads (root or nested `page`). */
export function extractLobbyToken(value: unknown): string | null {
  if (!isRecord(value)) return null;
  const top = value.token;
  if (typeof top === 'string' && top.trim()) return top.trim();
  const page = value.page;
  if (isRecord(page)) {
    const nested = page.token;
    if (typeof nested === 'string' && nested.trim()) return nested.trim();
  }
  return null;
}
