import type { InitKey, TranslationKey } from '@api/lobby/queryFns';
import type { InitV2Content, Words } from '@api/lobby/types';
import type { UseApiQueryResult } from '@api/types';

import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';

import { resolveBootstrapRouteState } from './resolveBootstrapRouteState';

const INIT_KEY = ['lobby', 'init', 'en', '/profile'] as InitKey;
const TRANSLATION_KEY = ['lobby', 'translation', 'en'] as TranslationKey;

function createQueryResult<T>(overrides: Partial<UseApiQueryResult<T>> = {}): UseApiQueryResult<T> {
  return {
    content: undefined,
    extra: undefined,
    loading: false,
    error: null,
    query: {
      status: 'pending',
      isEnabled: true,
      fetchStatus: 'idle',
    } as UseApiQueryResult<T>['query'],
    ...overrides,
  };
}

describe('resolveBootstrapRouteState', () => {
  it('returns pending while init is still loading', () => {
    const queryClient = new QueryClient();

    const state = resolveBootstrapRouteState({
      queryClient,
      language: 'en',
      initKey: INIT_KEY,
      translationKey: TRANSLATION_KEY,
      hasCachedInit: false,
      isTranslationReady: true,
      init: createQueryResult<InitV2Content>({ loading: true }),
      translation: createQueryResult<Words>({
        content: { hello: 'Hello' },
        query: {
          status: 'success',
          isEnabled: true,
          fetchStatus: 'idle',
        } as UseApiQueryResult<Words>['query'],
      }),
    });

    expect(state).toEqual({ status: 'pending' });
  });

  it('returns ready when init content is available', () => {
    const queryClient = new QueryClient();

    const state = resolveBootstrapRouteState({
      queryClient,
      language: 'en',
      initKey: INIT_KEY,
      translationKey: TRANSLATION_KEY,
      hasCachedInit: false,
      isTranslationReady: true,
      init: createQueryResult<InitV2Content>({ content: { page: {} } }),
      translation: createQueryResult<Words>(),
    });

    expect(state).toEqual({ status: 'ready' });
  });

  it('returns ready when init is cached in the query client', () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(INIT_KEY, { content: { page: {} } });

    const state = resolveBootstrapRouteState({
      queryClient,
      language: 'en',
      initKey: INIT_KEY,
      translationKey: TRANSLATION_KEY,
      hasCachedInit: true,
      isTranslationReady: false,
      init: createQueryResult<InitV2Content>(),
      translation: createQueryResult<Words>(),
    });

    expect(state).toEqual({ status: 'ready' });
  });

  it('returns error when translation fails before init', () => {
    const queryClient = new QueryClient();
    const translationError = new Error('translation failed');

    const state = resolveBootstrapRouteState({
      queryClient,
      language: 'en',
      initKey: INIT_KEY,
      translationKey: TRANSLATION_KEY,
      hasCachedInit: false,
      isTranslationReady: false,
      init: createQueryResult<InitV2Content>(),
      translation: createQueryResult<Words>({
        error: translationError,
        query: {
          status: 'error',
          isEnabled: true,
          fetchStatus: 'idle',
        } as UseApiQueryResult<Words>['query'],
      }),
    });

    expect(state).toEqual({ status: 'error', error: translationError });
  });
});
