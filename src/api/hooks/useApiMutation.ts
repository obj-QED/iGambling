import type { UseApiMutationParams, UseApiMutationResult } from '../types';

import { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';

export function useApiMutation<TContent, TVariables = void>(
  params: UseApiMutationParams<TContent, TVariables>,
): UseApiMutationResult<TContent, TVariables> {
  const mutation = useMutation(params);

  const fnMutation = useCallback(
    async (variables: TVariables): Promise<TContent | undefined> => {
      const response = await mutation.mutateAsync(variables);
      return response.content;
    },
    [mutation],
  );

  return {
    content: mutation.data?.content,
    loading: mutation.isPending,
    error: mutation.error ?? null,
    fnMutation,
    mutation,
  };
}
