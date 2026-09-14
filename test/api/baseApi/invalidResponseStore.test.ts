import { afterEach, describe, expect, it } from 'vitest';

import type { InternalAxiosRequestConfig } from 'axios';

import {
  createInvalidResponseError,
  getInvalidResponse,
  InvalidResponseError,
  lobbyApiClient,
  reportInvalidResponse,
  resetInvalidResponse,
} from '@/api/baseApi';

describe('invalid response store', () => {
  afterEach(() => {
    resetInvalidResponse();
  });

  it('keeps the first malformed payload', () => {
    const first = createInvalidResponseError('<b>Parse error</b>', 200);
    const second = createInvalidResponseError('other', 500);
    expect(first).toBeInstanceOf(InvalidResponseError);
    expect(second).toBeInstanceOf(InvalidResponseError);
    if (first == null || second == null) {
      throw new Error('expected invalid errors');
    }

    reportInvalidResponse(first);
    reportInvalidResponse(second);

    expect(getInvalidResponse()?.snippet).toContain('Parse error');
    expect(getInvalidResponse()?.snippet).not.toContain('other');
  });

  it('does not treat a JSON object as invalid', () => {
    expect(createInvalidResponseError({ content: { home: 'Home' } }, 200)).toBeNull();
  });
});

describe('lobby client invalid JSON interceptor', () => {
  const originalAdapter = lobbyApiClient.defaults.adapter;

  afterEach(() => {
    lobbyApiClient.defaults.adapter = originalAdapter;
    resetInvalidResponse();
  });

  it('reports an HTML 200 body onto the invalid-response page store', async () => {
    lobbyApiClient.defaults.adapter = async (config) => ({
      data: '<br />Parse error: unexpected token',
      status: 200,
      statusText: 'OK',
      headers: {},
      config: config as InternalAxiosRequestConfig,
    });

    await expect(lobbyApiClient.get('/apiLobby.php')).rejects.toBeInstanceOf(InvalidResponseError);
    expect(getInvalidResponse()?.snippet).toContain('Parse error: unexpected token');
  });
});

describe('invalid response store', () => {
  afterEach(() => {
    resetInvalidResponse();
  });

  it('keeps the first malformed payload', () => {
    const first = createInvalidResponseError('<b>Parse error</b>', 200);
    const second = createInvalidResponseError('other', 500);
    expect(first).toBeInstanceOf(InvalidResponseError);
    expect(second).toBeInstanceOf(InvalidResponseError);
    if (first == null || second == null) {
      throw new Error('expected invalid errors');
    }

    reportInvalidResponse(first);
    reportInvalidResponse(second);

    expect(getInvalidResponse()?.snippet).toContain('Parse error');
    expect(getInvalidResponse()?.snippet).not.toContain('other');
  });

  it('does not treat a JSON object as invalid', () => {
    expect(createInvalidResponseError({ content: { home: 'Home' } }, 200)).toBeNull();
  });
});
