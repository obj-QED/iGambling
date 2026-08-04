import type { QueryFunctionContext } from '@tanstack/react-query';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getLobbySessionTokenSnapshot } from '@/api/lobby/lobbySession';
import { initQueryFn, pageQueryFn, translationQueryFn } from '@/api/lobby/queryFns';
import { lobbyQueryKeys } from '@/api/lobby/queryKeys';
import { fetchTranslation, getPage, initV2 } from '@/api/lobby/requests';

vi.mock('@/api/lobby/requests');
vi.mock('@/api/lobby/lobbySession');

const mockedFetchTranslation = vi.mocked(fetchTranslation);
const mockedGetPage = vi.mocked(getPage);
const mockedInitV2 = vi.mocked(initV2);
const mockedGetLobbySessionTokenSnapshot = vi.mocked(getLobbySessionTokenSnapshot);

function queryContext<TQueryKey extends readonly unknown[]>(
  queryKey: TQueryKey,
  signal: AbortSignal,
): QueryFunctionContext<TQueryKey> {
  return { queryKey, signal } as unknown as QueryFunctionContext<TQueryKey>;
}

describe('lobby query functions', () => {
  beforeEach(() => {
    mockedFetchTranslation.mockResolvedValue({ content: {} });
    mockedInitV2.mockResolvedValue({ content: {} });
    mockedGetPage.mockResolvedValue({ content: {} });
    mockedGetLobbySessionTokenSnapshot.mockReturnValue(null);
  });

  it('passes abort signal to bootstrap translation request', async () => {
    const signal = new AbortController().signal;

    await translationQueryFn(queryContext(lobbyQueryKeys.translation('en'), signal));

    expect(mockedFetchTranslation).toHaveBeenCalledWith('en', signal);
  });

  it('passes lobby session token and abort signal to initV2', async () => {
    const signal = new AbortController().signal;

    await initQueryFn(queryContext(lobbyQueryKeys.init('en', '/'), signal));

    expect(mockedInitV2).toHaveBeenCalledWith({ language: 'en', page: '/' }, signal);
  });

  it('passes non-null snapshot token into initV2', async () => {
    mockedGetLobbySessionTokenSnapshot.mockReturnValue('1383_abc');
    const signal = new AbortController().signal;

    await initQueryFn(queryContext(lobbyQueryKeys.init('en', '/'), signal));

    expect(mockedInitV2).toHaveBeenCalledWith({ language: 'en', page: '/', token: '1383_abc' }, signal);
  });

  it('passes abort signal to page requests', async () => {
    const signal = new AbortController().signal;

    await pageQueryFn(queryContext(lobbyQueryKeys.page('en', '/games', 0), signal));

    expect(mockedGetPage).toHaveBeenCalledWith({ language: 'en', page: '/games' }, signal);
  });

  it('passes snapshot token into getPage (not from query key)', async () => {
    mockedGetLobbySessionTokenSnapshot.mockReturnValue('tok_1');
    const signal = new AbortController().signal;

    await pageQueryFn(queryContext(lobbyQueryKeys.page('en', '/games', 2), signal));

    expect(mockedGetPage).toHaveBeenCalledWith(
      { language: 'en', page: '/games', token: 'tok_1' },
      signal,
    );
  });
});