import type { AppDispatch } from '@store';

import { useLayoutEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { resolveBootstrapRouteState } from '@/app/routing/resolveBootstrapRouteState';

import { mergeKnownAppPathsFromPage } from '@api/lobby/lib/knownAppPathsStore';
import { applyLobbySessionFromInitContent, hasAuthIdentity } from '@api/lobby/lobbySession';
import { useInitData } from '@api/lobby/queries/useInitData';
import { useTranslation } from '@api/lobby/queries/useTranslation';
import { setAuthenticated } from '@store/slices/authSlice';

export function useAppBootstrap() {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const {
    translation,
    translationKey,
    language,
    isReady: isTranslationReady,
    t,
  } = useTranslation();
  const { init, initKey } = useInitData({ enabled: isTranslationReady });

  const hasCachedInit = queryClient.getQueryData(initKey) !== undefined;

  // Before paint — allowlist ready so InfoPage does not 404 on entry deep-links.
  useLayoutEffect(() => {
    const content = init.content;
    if (content === undefined) return;
    applyLobbySessionFromInitContent(content);
    dispatch(setAuthenticated(hasAuthIdentity(content)));
    if (content.page !== undefined) {
      mergeKnownAppPathsFromPage(content.page);
    }
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

  return {
    bootstrapRouteState,
    init,
    translation,
    initKey,
    translationKey,
    language,
    t,
  };
}
