import type { InitKey, TranslationKey } from '../queryFns';

import { useQueryClient } from '@tanstack/react-query';

import { useApiQuery } from '../../useApiQuery';
import { LOBBY_QUERY_POLICY } from '../policy';
import { initQueryFn, translationQueryFn } from '../queryFns';
import { lobbyQueryKeys } from '../queryKeys';

export function useInitData(language: string, page: string) {
  const queryClient = useQueryClient();
  const initKey: InitKey = lobbyQueryKeys.init(language, page);
  const translationKey: TranslationKey = lobbyQueryKeys.translation(language);
  const translationState = queryClient.getQueryState(translationKey);

  const translation = useApiQuery({
    queryKey: translationKey,
    queryFn: translationQueryFn,
    enabled: Boolean(language),
    staleTime: LOBBY_QUERY_POLICY.translation.staleTime,
    gcTime: LOBBY_QUERY_POLICY.translation.gcTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const isTranslationReady =
    translation.query.status === 'success' || translationState?.status === 'success';

  const init = useApiQuery({
    queryKey: initKey,
    queryFn: initQueryFn,
    enabled: Boolean(language) && isTranslationReady,
    staleTime: LOBBY_QUERY_POLICY.init.staleTime,
    gcTime: LOBBY_QUERY_POLICY.init.gcTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  return { init, translation, initKey, translationKey };
}
