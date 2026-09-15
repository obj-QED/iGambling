import type { TranslationKey } from '../queryFns';
import type { Words } from '../types';

import { useQueryClient } from '@tanstack/react-query';

import { useLanguage } from '@hooks/useLanguage';

import { useApiQuery } from '../../hooks/useApiQuery';
import { translateWord } from '../lib/translateWord';
import { LOBBY_QUERY_POLICY } from '../policy';
import { translationQueryFn } from '../queryFns';
import { lobbyQueryKeys } from '../queryKeys';

/**
 * Lobby i18n dictionary. Lookup: `t('some.key')` → `words[key]`.
 * Request params (language, …) stay inside this hook — not bootstrap’s job.
 */
export function useTranslation() {
  const language = useLanguage();
  const queryClient = useQueryClient();
  const translationKey: TranslationKey = lobbyQueryKeys.translation(language);
  const cachedState = queryClient.getQueryState(translationKey);

  const translation = useApiQuery<Words, TranslationKey>({
    queryKey: translationKey,
    queryFn: translationQueryFn,
    enabled: Boolean(language),
    staleTime: LOBBY_QUERY_POLICY.translation.staleTime,
    gcTime: LOBBY_QUERY_POLICY.translation.gcTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const isReady = translation.query.status === 'success' || cachedState?.status === 'success';

  const words = translation.content;

  function t(key: string): string {
    return translateWord(words, key);
  }

  return { translation, translationKey, language, isReady, t };
}
