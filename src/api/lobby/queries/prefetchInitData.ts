import type { QueryClient } from '@tanstack/react-query';

import { LOBBY_QUERY_POLICY } from '../policy';
import { initQueryFn, translationQueryFn } from '../queryFns';
import { lobbyQueryKeys } from '../queryKeys';

export async function prefetchInitData(
  queryClient: QueryClient,
  language: string,
  page: string,
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: lobbyQueryKeys.translation(language),
    queryFn: translationQueryFn,
    staleTime: LOBBY_QUERY_POLICY.translation.staleTime,
    gcTime: LOBBY_QUERY_POLICY.translation.gcTime,
  });

  await queryClient.prefetchQuery({
    queryKey: lobbyQueryKeys.init(language, page),
    queryFn: initQueryFn,
    staleTime: LOBBY_QUERY_POLICY.init.staleTime,
    gcTime: LOBBY_QUERY_POLICY.init.gcTime,
  });
}
