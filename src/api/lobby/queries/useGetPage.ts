import type { InitKey, PageKey } from '../queryFns';
import type { GetPageContent, InitV2Content, PageData } from '../types';

import { useEffect, useMemo, useSyncExternalStore } from 'react';

import { useLanguage } from '@hooks/useLanguage';

import { usePathname } from '@/shared/hooks';
import { getInitialPath } from '@/shared/lib/routing';

import { useApiQuery } from '../../hooks/useApiQuery';
import {
  getEntryPathGateVersion,
  hasLeftEntryPath,
  markLeftEntryPath,
  subscribeEntryPathGate,
} from '../lib/entryPathGate';
import { mergeKnownAppPathsFromPage } from '../lib/knownAppPathsStore';
import { getLobbySessionRevision, subscribeLobbySession } from '../lobbySession';
import { LOBBY_QUERY_POLICY } from '../policy';
import { initQueryFn, pageQueryFn } from '../queryFns';
import { lobbyQueryKeys } from '../queryKeys';
import { sanitizePageData, toPageData } from '../sanitize';

/** SPA shells — do not call `getPage`. */
const SKIP_GET_PAGE_PATHS = new Set(['/auth', '/register', '/profile/activation', '/404', '/500']);

/**
 * Entry path: page payload from bootstrap `initV2` cache (no second fetch).
 * After first SPA navigation: `getPage` via TanStack Query on every pathname
 * (`staleTime: 0`, `refetchOnMount: 'always'`).
 */
export function useGetPage(): {
  data: PageData | undefined;
  loading: boolean;
  error: unknown | null;
} {
  const language = useLanguage();
  const pathname = usePathname();
  const initialPath = getInitialPath();
  useSyncExternalStore(subscribeEntryPathGate, getEntryPathGateVersion, getEntryPathGateVersion);
  const sessionRevision = useSyncExternalStore(
    subscribeLobbySession,
    getLobbySessionRevision,
    getLobbySessionRevision,
  );

  const page = pathname.length > 0 ? pathname : '/';
  const skip = SKIP_GET_PAGE_PATHS.has(page);

  useEffect(() => {
    if (page !== initialPath) {
      markLeftEntryPath();
    }
  }, [page, initialPath]);

  const onEntryInit = !skip && !hasLeftEntryPath() && page === initialPath;

  // Observe bootstrap init cache only — `enabled: false` never starts a second request.
  const initKey: InitKey = lobbyQueryKeys.init(language, initialPath);
  const initObserver = useApiQuery<InitV2Content, InitKey>({
    queryKey: initKey,
    queryFn: initQueryFn,
    enabled: false,
    staleTime: LOBBY_QUERY_POLICY.init.staleTime,
    gcTime: LOBBY_QUERY_POLICY.init.gcTime,
  });

  const pageKey: PageKey = lobbyQueryKeys.page(language, page, sessionRevision);
  const pageQuery = useApiQuery<GetPageContent, PageKey>({
    queryKey: pageKey,
    queryFn: pageQueryFn,
    enabled: Boolean(language) && !skip && !onEntryInit,
    staleTime: LOBBY_QUERY_POLICY.page.staleTime,
    gcTime: LOBBY_QUERY_POLICY.page.gcTime,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const initData = useMemo(
    () => sanitizePageData(toPageData(initObserver.content?.page)),
    [initObserver.content?.page],
  );
  const getPageData = useMemo(
    () => sanitizePageData(toPageData(pageQuery.content?.page)),
    [pageQuery.content?.page],
  );

  const data = onEntryInit ? initData : getPageData;

  useEffect(() => {
    if (data !== undefined) {
      mergeKnownAppPathsFromPage(data);
    }
  }, [data]);

  const initLoading =
    initObserver.content === undefined &&
    (initObserver.query.status === 'pending' || initObserver.query.isFetching);

  const loading = skip
    ? false
    : onEntryInit
      ? initLoading
      : pageQuery.loading || (pageQuery.query.isFetching && data === undefined);

  const error = skip ? null : onEntryInit ? (initObserver.query.error ?? null) : pageQuery.error;

  return { data, loading, error };
}
