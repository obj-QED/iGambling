import type { ApiEnvelope } from './contracts';
import type {
  QueryFunctionContext,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import { useMemo } from 'react';

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

  const extra = useMemo(() => {
    if (query.data === undefined) return undefined;
    return Object.fromEntries(Object.entries(query.data).filter(([key]) => key !== 'content'));
  }, [query.data]);

  const { data, isEnabled, status, error } = query;

  return useMemo(
    () => ({
      content: data?.content,
      extra,
      /** Enabled query still awaiting first successful payload (`pending`). Disabled queries may also read `pending` — check `isEnabled`. */
      loading: isEnabled && status === 'pending',
      error: error ?? null,
      query,
    }),
    [data, extra, isEnabled, status, error, query],
  );
}
