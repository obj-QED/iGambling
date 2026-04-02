import type { ApiEnvelope } from './contracts';
import type {
  QueryFunctionContext,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import { useQuery } from '@tanstack/react-query';

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

export function useApiQuery<TContent, TQueryKey extends QueryKey>(
  params: UseApiQueryParams<TContent, TQueryKey>,
): UseApiQueryResult<TContent> {
  const query = useQuery(params);
  const extra =
    query.data === undefined
      ? undefined
      : Object.fromEntries(Object.entries(query.data).filter(([key]) => key !== 'content'));

  return {
    content: query.data?.content,
    extra,
    loading: query.isPending,
    error: query.error ?? null,
    query,
  };
}
