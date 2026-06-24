import type { InitKey, TranslationKey } from '@api/lobby/queryFns';
import type { InitV2Content, Words } from '@api/lobby/types';
import type { UseApiQueryResult } from '@api/useApiQuery';
import type { QueryClient } from '@tanstack/react-query';

export type BootstrapRouteState =
  | { status: 'pending' }
  | { status: 'ready' }
  | { status: 'error'; error: unknown };

type ResolveBootstrapRouteStateParams = {
  queryClient: QueryClient;
  language: string;
  initKey: InitKey;
  translationKey: TranslationKey;
  hasCachedInit: boolean;
  isTranslationReady: boolean;
  init: UseApiQueryResult<InitV2Content>;
  translation: UseApiQueryResult<Words>;
};

/**
 * Blocks route matching until the first initV2 for the entry path has settled.
 * Prevents `path="*"` → /404 while bootstrap queries are still in flight.
 */
export function resolveBootstrapRouteState({
  queryClient,
  language,
  initKey,
  translationKey,
  hasCachedInit,
  isTranslationReady,
  init,
  translation,
}: ResolveBootstrapRouteStateParams): BootstrapRouteState {
  if (language.trim().length === 0) {
    return { status: 'pending' };
  }

  const initState = queryClient.getQueryState(initKey);
  const translationState = queryClient.getQueryState(translationKey);

  if (hasCachedInit || init.content !== undefined || initState?.status === 'success') {
    return { status: 'ready' };
  }

  if (translationState?.status === 'error' || translation.query.status === 'error') {
    return {
      status: 'error',
      error: translation.error ?? translationState?.error ?? new Error('translation failed'),
    };
  }

  if (isTranslationReady && (initState?.status === 'error' || init.query.status === 'error')) {
    return {
      status: 'error',
      error: init.error ?? initState?.error ?? new Error('initV2 failed'),
    };
  }

  return { status: 'pending' };
}
