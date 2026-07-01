import type { ApiEnvelope } from './contracts.types';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

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
