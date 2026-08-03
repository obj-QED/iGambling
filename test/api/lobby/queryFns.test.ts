import type { QueryFunctionContext } from '@tanstack/react-query';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getLobbySessionTokenSnapshot } from '@/api/lobby/lobbySession';
import { initQueryFn, pageQueryFn, translationQueryFn } from '@/api/lobby/queryFns';
import { lobbyQueryKeys } from '@/api/lobby/queryKeys';
import { fetchTranslation, getPage, initV2 } from '@/api/lobby/requests';

vi.mock('./requests', () => ({
  fetchTranslation: vi.fn(),
  getPage: vi.fn(),
  initV2: vi.fn(),
}));

vi.mock('./lobbySession', () => ({
  getLobbySessionTokenSnapshot: vi.fn(() => null),
}));

function queryContext<TQueryKey extends readonly unknown[]>(
  queryKey: TQueryKey,
  signal: AbortSignal,
): QueryFunctionContext<TQueryKey> {
  return { queryKey, signal } as unknown as QueryFunctionContext<TQueryKey>;
}

describe('lobby query functions', () => {
  beforeEach(() => {
    vi.mocked(fetchTranslation).mockResolvedValue({ content: {} });
    vi.mocked(initV2).mockResolvedValue({ content: {} });
    vi.mocked(getPage).mockResolvedValue({ content: {} });
    vi.mocked(getLobbySessionTokenSnapshot).mockReturnValue(null);
  });

  it('passes abort signal to bootstrap translation request', async () => {
    const signal = new AbortController().signal;

    await translationQueryFn(queryContext(lobbyQueryKeys.translation('en'), signal));

    expect(fetchTranslation).toHaveBeenCalledWith('en', signal);
  });

  it('passes lobby session token and abort signal to initV2', async () => {
    const signal = new AbortController().signal;

    await initQueryFn(queryContext(lobbyQueryKeys.init('en', '/'), signal));

    expect(initV2).toHaveBeenCalledWith({ language: 'en', page: '/' }, signal);
  });

  it('passes non-null snapshot token into initV2', async () => {
    vi.mocked(getLobbySessionTokenSnapshot).mockReturnValue('1383_abc');
    const signal = new AbortController().signal;

    await initQueryFn(queryContext(lobbyQueryKeys.init('en', '/'), signal));

    expect(initV2).toHaveBeenCalledWith({ language: 'en', page: '/', token: '1383_abc' }, signal);
  });

  it('passes abort signal to page requests', async () => {
    const signal = new AbortController().signal;

    await pageQueryFn(queryContext(lobbyQueryKeys.page('en', '/games', 0), signal));

    expect(getPage).toHaveBeenCalledWith({ language: 'en', page: '/games' }, signal);
  });

  it('passes snapshot token into getPage (not from query key)', async () => {
    vi.mocked(getLobbySessionTokenSnapshot).mockReturnValue('tok_1');
    const signal = new AbortController().signal;

    await pageQueryFn(queryContext(lobbyQueryKeys.page('en', '/games', 2), signal));

    expect(getPage).toHaveBeenCalledWith(
      { language: 'en', page: '/games', token: 'tok_1' },
      signal,
    );
  });
});
