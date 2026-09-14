import { describe, expect, it } from 'vitest';

import { assertJsonRecordResponse, ServerError } from '@/api/baseApi';

describe('assertJsonRecordResponse', () => {
  it('accepts JSON objects', () => {
    expect(() => assertJsonRecordResponse({ content: {} }, 200)).not.toThrow();
  });

  it('rejects HTML / unparsed JSON / empty bodies as 500', () => {
    expect(() => assertJsonRecordResponse('<br />Parse error', 200)).toThrow(ServerError);
    expect(() => assertJsonRecordResponse('not-json', 200)).toThrow(/Invalid JSON response/);
    expect(() => assertJsonRecordResponse(null, 200)).toThrow(ServerError);
    expect(() => assertJsonRecordResponse([{ ok: true }], 200)).toThrow(ServerError);
  });
});
