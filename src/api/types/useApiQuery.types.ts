import type { ApiEnvelope } from './contracts.types';
import type {
  QueryFunctionContext,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

export type UseApiQueryParams<TContent, TQueryKey extends QueryKey> = Omit<
  UseQueryOptions<ApiEnvelope<TContent>, unknown, ApiEnvelope<TContent>, TQueryKey>,
  'queryKey' | 'queryFn'
> & {
  queryKey: TQueryKey;
  queryFn: (context: QueryFunctionContext<TQueryKey>) => Promise<ApiEnvelope<TContent>>;
};

export type UseApiQueryResult<TContent> = {
  content: TContent | undefined;
  extra: Record<string, unknown> | undefined;
  loading: boolean;
  error: unknown | null;
  query: UseQueryResult<ApiEnvelope<TContent>, unknown>;
};
