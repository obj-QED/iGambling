import type { InitKey } from '../queryFns';
import type { InitV2Content, PageData } from '../types';

import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getInitialPath } from '@/shared/lib/routing';

import { useApiQuery } from '../../hooks/useApiQuery';
import { mergeKnownAppPathsFromPage } from '../lib/knownAppPathsStore';
import {
  getPageNavSnapshot,
  markClientNavigated,
  runGetPageNav,
  subscribePageNav,
} from '../lib/pageNavStore';
import { getLobbySessionRevision, subscribeLobbySession } from '../lobbySession';
import { LOBBY_QUERY_POLICY } from '../policy';
import { initQueryFn } from '../queryFns';
import { lobbyQueryKeys } from '../queryKeys';
import { sanitizePageData, toPageData } from '../sanitize';

/** SPA shells — do not call `getPage` (no CMS payload). */
const SKIP_GET_PAGE_PATHS = new Set(['/auth', '/register', '/profile/activation', '/404', '/500']);

export function useCurrentPageData(language: string, pathname: string): PageData | undefined {
  const state = useCurrentPageDataState(language, pathname);
  return state.data;
}

/**
 * Entry path: `initV2` once.
 * Every client navigation (incl. revisit): `getPage` via {@link runGetPageNav}.
 * `clientNavigated` is module-shared so InfoPage remount still uses getPage, not entry init.
 */
export function useCurrentPageDataState(
  language: string,
  pathname: string,
): {
  data: PageData | undefined;
  loading: boolean;
  /** Активный init/page-запрос в полёте. */
  isFetching: boolean;
  /** Nav result not yet for this pathname. */
  isPlaceholderData: boolean;
  /** Current pathname finished (success or error), not in flight. */
  isSettled: boolean;
  error: unknown | null;
} {
  useSyncExternalStore(subscribeLobbySession, getLobbySessionRevision, getLobbySessionRevision);
  const nav = useSyncExternalStore(subscribePageNav, getPageNavSnapshot, getPageNavSnapshot);
  const queryClient = useQueryClient();

  const initialPath = getInitialPath();
  const page = pathname.length > 0 ? pathname : '/';
  const skipGetPage = SKIP_GET_PAGE_PATHS.has(page);

  const pathRef = useRef(page);
  useEffect(() => {
    if (pathRef.current !== page) {
      pathRef.current = page;
      markClientNavigated();
    }
  }, [page]);

  const useGetPage = !skipGetPage && nav.clientNavigated;
  const useInitPage = !skipGetPage && !nav.clientNavigated;

  useEffect(() => {
    if (!useGetPage || !language) return;
    void runGetPageNav({ language, page, queryClient });
  }, [useGetPage, language, page, queryClient]);

  const initKey: InitKey = lobbyQueryKeys.init(language, initialPath);
  const initQuery = useApiQuery<InitV2Content, InitKey>({
    queryKey: initKey,
    queryFn: initQueryFn,
    enabled: Boolean(language) && useInitPage,
    staleTime: LOBBY_QUERY_POLICY.init.staleTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const initContent: InitV2Content | undefined = initQuery.content;
  const initSource = useInitPage ? initContent?.page : undefined;
  const initData = useMemo(() => {
    const next = sanitizePageData(toPageData(initSource));
    if (next !== undefined) {
      mergeKnownAppPathsFromPage(next);
    }
    return next;
  }, [initSource]);

  const navMatches = useGetPage && nav.language === language && nav.path === page;
  const navPending = navMatches && nav.status === 'pending';
  const navSettled = navMatches && nav.status === 'settled';

  const data = skipGetPage
    ? undefined
    : useGetPage
      ? navMatches
        ? nav.data
        : undefined
      : initData;

  const loading = skipGetPage
    ? false
    : useGetPage
      ? !navMatches || (navPending && data === undefined)
      : initQuery.loading;

  const error = skipGetPage ? null : useGetPage ? (navSettled ? nav.error : null) : initQuery.error;

  const isFetching = skipGetPage
    ? false
    : useGetPage
      ? navPending || !navMatches
      : initQuery.query.isFetching;

  const isPlaceholderData = useGetPage && !navMatches;

  const isSettled = skipGetPage
    ? true
    : useGetPage
      ? navSettled
      : initQuery.query.isFetched && !initQuery.query.isFetching;

  return useMemo(
    () => ({ data, loading, isFetching, isPlaceholderData, isSettled, error }),
    [data, loading, isFetching, isPlaceholderData, isSettled, error],
  );
}
