import { describe, expect, it } from 'vitest';

import {
  assertJsonRecordResponse,
  createInvalidResponseError,
  InvalidResponseError,
  ServerError,
} from '@/api/baseApi';

describe('assertJsonRecordResponse', () => {
  it('accepts JSON objects', () => {
    expect(() => assertJsonRecordResponse({ content: {} }, 200)).not.toThrow();
  });

  it('rejects HTML / unparsed JSON / empty bodies as InvalidResponseError', () => {
    expect(() => assertJsonRecordResponse('<br />Parse error', 200)).toThrow(InvalidResponseError);
    expect(() => assertJsonRecordResponse('not-json', 200)).toThrow(/Invalid JSON response/);
    expect(() => assertJsonRecordResponse(null, 200)).toThrow(ServerError);
    expect(() => assertJsonRecordResponse([{ ok: true }], 200)).toThrow(ServerError);
  });

  it('keeps a body snippet on HTML parse leftovers', () => {
    const error = createInvalidResponseError('<br />Parse error: unexpected token', 200);
    expect(error).toBeInstanceOf(InvalidResponseError);
    expect(error?.status).toBe(500);
    expect(error?.snippet).toContain('Parse error');
  });
});
