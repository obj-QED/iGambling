import type { InitKey, TranslationKey } from '@api/lobby/queryFns';
import type { AppDispatch } from '@store';

import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { resolveBootstrapRouteState } from '@/app/routing/resolveBootstrapRouteState';

import { applyLobbySessionFromInitContent, hasAuthIdentity } from '@api/lobby/lobbySession';
import { useInitData } from '@api/lobby/queries/useInitData';
import { lobbyQueryKeys } from '@api/lobby/queryKeys';
import { setAuthenticated } from '@store/slices/authSlice';

import { getInitialPath } from '@/shared/lib/routing';

export function useAppBootstrap(language: string) {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const page = getInitialPath();
  const initKey: InitKey = lobbyQueryKeys.init(language, page);
  const translationKey: TranslationKey = lobbyQueryKeys.translation(language);
  const hasCachedInit = queryClient.getQueryData(initKey) !== undefined;
  const translationState = queryClient.getQueryState(translationKey);

  const { init, translation } = useInitData(language, page);

  const isTranslationReady =
    translation.query.status === 'success' || translationState?.status === 'success';

  useEffect(() => {
    const content = init.content;
    if (content === undefined) return;
    applyLobbySessionFromInitContent(content);
    dispatch(setAuthenticated(hasAuthIdentity(content)));
  }, [init.content, dispatch]);

  const bootstrapRouteState = resolveBootstrapRouteState({
    queryClient,
    language,
    initKey,
    translationKey,
    hasCachedInit,
    isTranslationReady,
    init,
    translation,
  });

  return { bootstrapRouteState, init, translation };
}
