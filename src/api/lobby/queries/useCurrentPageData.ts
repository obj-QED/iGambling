import type { InitKey, PageKey } from '../queryFns';
import type { GetPageContent, InitV2Content, PageData } from '../types';

import { useMemo, useSyncExternalStore } from 'react';

import { getInitialPath } from '@/shared/lib/routing';

import { useApiQuery } from '../../hooks/useApiQuery';
import { getLobbySessionRevision, subscribeLobbySession } from '../lobbySession';
import { LOBBY_QUERY_POLICY } from '../policy';
import { initQueryFn, pageQueryFn } from '../queryFns';
import { lobbyQueryKeys } from '../queryKeys';
import { sanitizePageData, toPageData } from '../sanitize';

export function useCurrentPageData(language: string, pathname: string): PageData | undefined {
  const state = useCurrentPageDataState(language, pathname);
  return state.data;
}

export function useCurrentPageDataState(
  language: string,
  pathname: string,
): {
  data: PageData | undefined;
  loading: boolean;
  /** Активный init/page-запрос в полёте (в т.ч. после success из кэша). */
  isFetching: boolean;
  error: unknown | null;
} {
  const sessionRevision = useSyncExternalStore(
    subscribeLobbySession,
    getLobbySessionRevision,
    getLobbySessionRevision,
  );
  const initialPath = getInitialPath();
  const page = pathname.length > 0 ? pathname : '/';
  const isNavigation = page !== initialPath;

  const pageKey: PageKey = lobbyQueryKeys.page(language, page, sessionRevision);
  const pageQuery = useApiQuery({
    queryKey: pageKey,
    queryFn: pageQueryFn,
    enabled: Boolean(language) && isNavigation,
    staleTime: LOBBY_QUERY_POLICY.page.staleTime,
    gcTime: LOBBY_QUERY_POLICY.page.gcTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const initKey: InitKey = lobbyQueryKeys.init(language, initialPath);
  const initQuery = useApiQuery({
    queryKey: initKey,
    queryFn: initQueryFn,
    enabled: Boolean(language) && !isNavigation,
    staleTime: LOBBY_QUERY_POLICY.init.staleTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const pageContent: GetPageContent | undefined = pageQuery.content;
  const initContent: InitV2Content | undefined = initQuery.content;

  const source = isNavigation ? pageContent?.page : initContent?.page;
  const data = useMemo(() => sanitizePageData(toPageData(source)), [source]);
  const loading = isNavigation ? pageQuery.loading : initQuery.loading;
  const error = isNavigation ? pageQuery.error : initQuery.error;
  const isFetching = isNavigation ? pageQuery.query.isFetching : initQuery.query.isFetching;

  return useMemo(() => ({ data, loading, isFetching, error }), [data, loading, isFetching, error]);
}
