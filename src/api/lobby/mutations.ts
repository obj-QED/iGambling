import type { GetPageContent } from './types';

import { useQueryClient } from '@tanstack/react-query';

import { useApiMutation } from '../hooks/useApiMutation';
import { runGetPageNav } from './lib/pageNavStore';

type InvalidateInitResponse = {
  value: boolean;
};

export type GetPageMutationVars = {
  language: string;
  page: string;
};

/**
 * Client navigation: always POST `getPage` through {@link runGetPageNav}
 * (shared store — one network call even if several hooks subscribe).
 */
export function useGetPageMutation() {
  const queryClient = useQueryClient();

  return useApiMutation<GetPageContent, GetPageMutationVars>({
    mutationKey: ['lobby', 'getPage'],
    mutationFn: async ({ language, page }) => {
      const envelope = await runGetPageNav({ language, page, queryClient });
      if (envelope === undefined) {
        throw new Error('getPage nav superseded');
      }
      return envelope;
    },
  });
}

/**
 * Мутация «обновить init»: данные уже есть в кэше, но нужно перезапросить (например после смены языка/страницы или по действию пользователя).
 * Вызов refetch() у useInitData или invalidateInit() здесь — один и тот же эффект.
 */
export function useInvalidateInit() {
  const queryClient = useQueryClient();

  return useApiMutation<InvalidateInitResponse>({
    mutationFn: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'lobby' && query.queryKey[1] === 'init',
        }),
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'lobby' && query.queryKey[1] === 'page',
        }),
      ]);
      return { content: { value: true } };
    },
  });
}
