import { describe, expect, it } from 'vitest';

import { toApiEnvelope } from './contracts';

describe('toApiEnvelope', () => {
  it('keeps normalized content and preserves extra response fields', () => {
    const payload = {
      content: { page: { blocks: [] } },
      error: null,
      meta: { revision: 7 },
      mt: 0.03,
    };
    const envelope = toApiEnvelope(payload, value => value);

    expect(envelope.content).toEqual({ page: { blocks: [] } });
    expect(envelope.error).toBeNull();
    expect(envelope.meta).toEqual({ revision: 7 });
    expect(envelope.mt).toBe(0.03);
  });

  it('works with payloads without content field', () => {
    const payload = { page: { blocks: [{ type: 'banner' }] } };
    const envelope = toApiEnvelope(payload, value => value);

    expect(envelope.content).toEqual(payload);
    expect(envelope.error).toBeUndefined();
  });
});
