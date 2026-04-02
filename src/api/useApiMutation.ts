import type { ApiEnvelope } from './contracts';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { useMutation } from '@tanstack/react-query';

export type UseApiMutationParams<TContent, TVariables> = UseMutationOptions<
  ApiEnvelope<TContent>,
  unknown,
  TVariables
>;

export type UseApiMutationResult<TContent, TVariables> = {
  content: TContent | undefined;
  loading: boolean;
  error: unknown | null;
  fnMutation: (variables: TVariables) => Promise<TContent | undefined>;
  mutation: UseMutationResult<ApiEnvelope<TContent>, unknown, TVariables>;
};

export function useApiMutation<TContent, TVariables = void>(
  params: UseApiMutationParams<TContent, TVariables>,
): UseApiMutationResult<TContent, TVariables> {
  const mutation = useMutation(params);

  async function fnMutation(variables: TVariables): Promise<TContent | undefined> {
    const response = await mutation.mutateAsync(variables);
    return response.content;
  }

  return {
    content: mutation.data?.content,
    loading: mutation.isPending,
    error: mutation.error ?? null,
    fnMutation,
    mutation,
  };
}
