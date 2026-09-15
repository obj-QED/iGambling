import type { InitKey } from '../queryFns';
import type { InitV2Content } from '../types';

import { useLanguage } from '@hooks/useLanguage';

import { getInitialPath } from '@/shared/lib/routing';

import { useApiQuery } from '../../hooks/useApiQuery';
import { LOBBY_QUERY_POLICY } from '../policy';
import { initQueryFn } from '../queryFns';
import { lobbyQueryKeys } from '../queryKeys';

type UseInitDataOptions = {
  /** Gate on translation success (`translation → init`). */
  enabled?: boolean;
};

/**
 * Entry `initV2` only. Language / entry page resolved here — not passed from bootstrap.
 */
export function useInitData(options?: UseInitDataOptions) {
  const language = useLanguage();
  const page = getInitialPath();
  const initKey: InitKey = lobbyQueryKeys.init(language, page);
  const enabled = options?.enabled ?? true;

  const init = useApiQuery<InitV2Content, InitKey>({
    queryKey: initKey,
    queryFn: initQueryFn,
    enabled: Boolean(language) && enabled,
    staleTime: LOBBY_QUERY_POLICY.init.staleTime,
    gcTime: LOBBY_QUERY_POLICY.init.gcTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  return { init, initKey, language, page };
}
