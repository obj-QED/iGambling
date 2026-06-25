import { QueryClient } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LOBBY_QUERY_POLICY } from '../policy';
import { prefetchInitData } from '../queries/prefetchInitData';
import { initQueryFn, translationQueryFn } from '../queryFns';
import { lobbyQueryKeys } from '../queryKeys';

describe('prefetchInitData', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('prefetches translation then init with lobby query policy', async () => {
    const queryClient = new QueryClient();
    const prefetchSpy = vi.spyOn(queryClient, 'prefetchQuery').mockResolvedValue(undefined);

    await prefetchInitData(queryClient, 'en', '/profile');

    expect(prefetchSpy).toHaveBeenCalledTimes(2);
    expect(prefetchSpy).toHaveBeenNthCalledWith(1, {
      queryKey: lobbyQueryKeys.translation('en'),
      queryFn: translationQueryFn,
      staleTime: LOBBY_QUERY_POLICY.translation.staleTime,
      gcTime: LOBBY_QUERY_POLICY.translation.gcTime,
    });
    expect(prefetchSpy).toHaveBeenNthCalledWith(2, {
      queryKey: lobbyQueryKeys.init('en', '/profile'),
      queryFn: initQueryFn,
      staleTime: LOBBY_QUERY_POLICY.init.staleTime,
      gcTime: LOBBY_QUERY_POLICY.init.gcTime,
    });
  });
});
