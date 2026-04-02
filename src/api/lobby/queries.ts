import type {
  GetPageContent,
  InitV2Content,
  PageData,
  TranslationResponse,
} from './types';
import type { AppDispatch } from '@/store';
import type { QueryClient } from '@tanstack/react-query';
import type { QueryFunctionContext } from '@tanstack/react-query';

import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useDispatch } from 'react-redux';

import { getInitialPath } from '@/app/routing/state/initialPath';

import { setAuthenticated } from '@/store/slices/authSlice';
import { setWords } from '@/store/slices/wordsSlice';

import { useApiQuery } from '../useApiQuery';
import { lobbyQueryKeys } from './queryKeys';
import { fetchTranslation, getPage, initV2 } from './requests';

const LOBBY_QUERY_POLICY = {
  translation: {
    staleTime: 24 * 60 * 60 * 1000, // 24h: перевод меняется редко
  },
  init: {
    staleTime: 5 * 60 * 1000, // 5m: баланс/состояние пользователя должны освежаться
  },
  page: {
    staleTime: 60 * 1000, // 1m: контент страницы можно кэшировать кратковременно
    gcTime: 30 * 60 * 1000, // 30m: держим посещённые страницы в памяти для быстрых возвратов
  },
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sanitizeHtml(value: string): string {
  if (typeof window === 'undefined') {
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/\son\w+="[^"]*"/gi, '')
      .replace(/\son\w+='[^']*'/gi, '');
  }
  return DOMPurify.sanitize(value, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['script'],
  });
}

function sanitizeInfo(value: unknown): unknown {
  if (!isRecord(value)) return value;
  const content = value.content;
  if (typeof content !== 'string') return value;
  return { ...value, content: sanitizeHtml(content) };
}

function sanitizePageData(pageData: PageData | undefined): PageData | undefined {
  if (!pageData) return pageData;
  return {
    ...pageData,
    info: sanitizeInfo(pageData.info),
  };
}

function hasAuthIdentity(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const hasId = value.id !== undefined && value.id !== null;
  const user = value.user;
  const hasUserId = isRecord(user) && user.id !== undefined && user.id !== null;
  return Boolean(hasId || hasUserId);
}

function toPageData(value: unknown): PageData | undefined {
  if (!isRecord(value)) return undefined;
  return { ...value };
}

type TranslationKey = ReturnType<typeof lobbyQueryKeys.translation>;
type InitKey = ReturnType<typeof lobbyQueryKeys.init>;
type PageKey = ReturnType<typeof lobbyQueryKeys.page>;

function initQueryFn({ queryKey: [, , language, page], signal }: QueryFunctionContext<InitKey>) {
  return initV2({ language, page: page ?? '/' }, signal);
}

function translationQueryFn({ queryKey: [, , language], signal }: QueryFunctionContext<TranslationKey>) {
  return fetchTranslation(language, signal);
}

function pageQueryFn({ queryKey: [, , language, page, token], signal }: QueryFunctionContext<PageKey>) {
  return getPage({ language, page: page ?? '/', token: token ?? null }, signal);
}

/**
 * До загрузки приложения: один запрос initV2 для первого пути, данные в кэш.
 */
export async function prefetchInitData(queryClient: QueryClient, language: string, page: string): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: lobbyQueryKeys.translation(language),
    queryFn: translationQueryFn,
    staleTime: LOBBY_QUERY_POLICY.translation.staleTime,
  });

  await queryClient.prefetchQuery({
    queryKey: lobbyQueryKeys.init(language, page),
    queryFn: initQueryFn,
    staleTime: LOBBY_QUERY_POLICY.init.staleTime,
  });
}

/**
 * Init — только для первого захода (один раз). Использует initialPath.
 */
export function useInitData(language: string) {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const page = getInitialPath();
  const queryKey: InitKey = lobbyQueryKeys.init(language, page);
  const hasCached = queryClient.getQueryData(queryKey) !== undefined;
  const translationKey: TranslationKey = lobbyQueryKeys.translation(language);
  const translationState = queryClient.getQueryState(translationKey);
  const isTranslationDone = translationState?.status === 'success' || translationState?.fetchStatus === 'fetching';

  const translationResult = useApiQuery({
    queryKey: translationKey,
    queryFn: translationQueryFn,
    enabled: Boolean(language) && !hasCached && !isTranslationDone,
    staleTime: LOBBY_QUERY_POLICY.translation.staleTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const isTranslationReady = translationResult.query?.status === 'success' || translationState?.status === 'success';

  const result = useApiQuery({
    queryKey,
    queryFn: initQueryFn,
    enabled: Boolean(language) && isTranslationReady && !hasCached,
    staleTime: LOBBY_QUERY_POLICY.init.staleTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    const content: InitV2Content | undefined = result.content;
    if (content) {
      dispatch(setAuthenticated(hasAuthIdentity(content)));
    }
  }, [result.content, dispatch]);

  useEffect(() => {
    const translation: TranslationResponse['content'] | undefined = translationResult.content;
    if (translation === undefined) return;
    dispatch(setWords(translation));
  }, [translationResult.content, dispatch]);

  return result;
}

export function useCurrentPageData(
  language: string,
  pathname: string,
  token?: string | null,
): PageData | undefined {
  const state = useCurrentPageDataState(language, pathname, token);
  return state.data;
}

export function useCurrentPageDataState(
  language: string,
  pathname: string,
  token?: string | null,
): { data: PageData | undefined; loading: boolean } {
  const initialPath = getInitialPath();
  const page = pathname || '/';
  const isNavigation = page !== initialPath;

  const pageKey: PageKey = lobbyQueryKeys.page(language, page, token);
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
  return {
    data: sanitizePageData(toPageData(source)),
    loading: isNavigation ? pageQuery.loading : initQuery.loading,
  };
}
