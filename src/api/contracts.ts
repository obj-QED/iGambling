import type { ApiEnvelope } from './types/contracts.types';

export type { ApiEnvelope };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function toApiEnvelope<TContent>(
  payload: unknown,
  normalize: (value: unknown) => TContent,
): ApiEnvelope<TContent> {
  if (isRecord(payload) && 'content' in payload) {
    return { ...payload, content: normalize(payload.content) };
  }
  return { content: normalize(payload) };
}
