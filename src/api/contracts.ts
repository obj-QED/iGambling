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
    const envelope: ApiEnvelope<TContent> = {
      content: normalize(payload.content),
    };
    if ('error' in payload) envelope.error = payload.error;
    if ('meta' in payload) envelope.meta = payload.meta;
    if ('mt' in payload) envelope.mt = payload.mt;
    return envelope;
  }
  return { content: normalize(payload) };
}
