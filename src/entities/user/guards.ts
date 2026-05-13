import { isRecord } from '@shared/lib';

import { extractLobbyToken } from './extractLobbyToken';

function hasUserRecordId(user: unknown): boolean {
  return isRecord(user) && user.id !== undefined && user.id !== null;
}

function hasPageAuthSignals(page: unknown): boolean {
  if (!isRecord(page)) return false;
  if (extractLobbyToken(page)) return true;
  if (page.id !== undefined && page.id !== null) return true;
  return hasUserRecordId(page.user);
}

export function hasAuthIdentity(value: unknown): boolean {
  if (!isRecord(value)) return false;
  if (extractLobbyToken(value)) return true;
  const hasId = value.id !== undefined && value.id !== null;
  if (hasId) return true;
  if (hasUserRecordId(value.user)) return true;
  return hasPageAuthSignals(value.page);
}
