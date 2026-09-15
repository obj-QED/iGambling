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

  it('does not consume abort signal for bootstrap translation', async () => {
    let signalAccessed = false;
    const ctx = {
      queryKey: lobbyQueryKeys.translation('en'),
      get signal() {
        signalAccessed = true;
        return new AbortController().signal;
      },
    } as unknown as QueryFunctionContext<ReturnType<typeof lobbyQueryKeys.translation>>;

    await translationQueryFn(ctx);

    expect(signalAccessed).toBe(false);
    expect(mockedFetchTranslation).toHaveBeenCalledWith('en');
  });

  it('does not consume abort signal for bootstrap initV2', async () => {
    let signalAccessed = false;
    const ctx = {
      queryKey: lobbyQueryKeys.init('en', '/'),
      get signal() {
        signalAccessed = true;
        return new AbortController().signal;
      },
    } as unknown as QueryFunctionContext<ReturnType<typeof lobbyQueryKeys.init>>;

    await initQueryFn(ctx);

    expect(signalAccessed).toBe(false);
    expect(mockedInitV2).toHaveBeenCalledWith({ language: 'en', page: '/' });
  });

  it('passes non-null snapshot token into initV2', async () => {
    mockedGetLobbySessionTokenSnapshot.mockReturnValue('1383_abc');

    await initQueryFn(queryContext(lobbyQueryKeys.init('en', '/'), new AbortController().signal));

    expect(mockedInitV2).toHaveBeenCalledWith({ language: 'en', page: '/', token: '1383_abc' });
  });

  it('passes abort signal to page requests', async () => {
    const signal = new AbortController().signal;

    await pageQueryFn(queryContext(lobbyQueryKeys.page('en', '/games', 0), signal));

    expect(mockedGetPage).toHaveBeenCalledWith({ language: 'en', page: '/games' }, signal);
    expect(mockedGetPage.mock.calls[0]?.[0]).not.toHaveProperty('token');
  });

  it('omits empty/whitespace token for getPage', async () => {
    mockedGetLobbySessionTokenSnapshot.mockReturnValue('   ');
    const signal = new AbortController().signal;

    await pageQueryFn(queryContext(lobbyQueryKeys.page('en', '/terms', 0), signal));

    expect(mockedGetPage).toHaveBeenCalledWith({ language: 'en', page: '/terms' }, signal);
    expect(mockedGetPage.mock.calls[0]?.[0]).not.toHaveProperty('token');
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
