import { useQueryClient } from '@tanstack/react-query';

import { useApiMutation } from '../hooks/useApiMutation';

type InvalidateInitResponse = {
  value: boolean;
};

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
