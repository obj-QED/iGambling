import { isRecord } from '@/shared/lib';

export function hasAuthIdentity(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const hasId = value.id !== undefined && value.id !== null;
  const user = value.user;
  const hasUserId = isRecord(user) && user.id !== undefined && user.id !== null;
  return Boolean(hasId || hasUserId);
}
