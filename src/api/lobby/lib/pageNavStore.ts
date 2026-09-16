import type { GetPageContent, GetPageResponse, PageData } from '../types';
import type { QueryClient } from '@tanstack/react-query';

import { getLobbySessionRevision, getLobbySessionTokenSnapshot } from '../lobbySession';
import { lobbyQueryKeys } from '../queryKeys';
import { getPage } from '../requests';
import { sanitizePageData, toPageData } from '../sanitize';
import { mergeKnownAppPathsFromPage } from './knownAppPathsStore';

export type PageNavStatus = 'idle' | 'pending' | 'settled';

export type PageNavState = {
  language: string;
  path: string;
  status: PageNavStatus;
  data: PageData | undefined;
  error: unknown | null;
  /** Bumps on every navigation request (React subscribe). */
  version: number;
};

const INITIAL: PageNavState = {
  language: '',
  path: '',
  status: 'idle',
  data: undefined,
  error: null,
  version: 0,
};

let state: PageNavState = INITIAL;
let generation = 0;
let inflightKey: string | null = null;
let inflightPromise: Promise<void> | null = null;
let lastEnvelope: GetPageResponse | undefined;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

function setState(patch: Partial<PageNavState>): void {
  state = { ...state, ...patch, version: state.version + 1 };
  emit();
}

export function getPageNavSnapshot(): PageNavState {
  return state;
}

export function subscribePageNav(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function nonEmptyToken(value: string | null | undefined): string | undefined {
  if (value == null) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function navKey(language: string, page: string): string {
  return `${language}\0${page}`;
}

/**
 * Always POST `getPage` for the given path (incl. revisit).
 * Concurrent same language+path share one in-flight request;
 * a newer path ignores the older response.
 */
export async function runGetPageNav(params: {
  language: string;
  page: string;
  queryClient?: QueryClient;
}): Promise<GetPageResponse | undefined> {
  const { language, page, queryClient } = params;
  const key = navKey(language, page);

  if (inflightKey === key && inflightPromise !== null) {
    await inflightPromise;
    const snap = getPageNavSnapshot();
    if (snap.error != null) throw snap.error;
    return lastEnvelope;
  }

  const gen = ++generation;
  inflightKey = key;

  let result: GetPageResponse | undefined;

  const promise = (async () => {
    const keepSamePath =
      state.path === page && state.language === language && state.data !== undefined
        ? state.data
        : undefined;

    setState({
      language,
      path: page,
      status: 'pending',
      data: keepSamePath,
      error: null,
    });

    try {
      const token = nonEmptyToken(getLobbySessionTokenSnapshot());
      const envelope = await getPage(
        token === undefined ? { language, page } : { language, page, token },
      );

      if (gen !== generation) return;

      const content = envelope.content as GetPageContent | undefined;
      const next = sanitizePageData(toPageData(content?.page));
      if (next !== undefined) {
        mergeKnownAppPathsFromPage(next);
      }

      if (queryClient !== undefined) {
        queryClient.setQueryData(
          lobbyQueryKeys.page(language, page, getLobbySessionRevision()),
          envelope,
        );
      }

      result = envelope;
      lastEnvelope = envelope;
      setState({
        language,
        path: page,
        status: 'settled',
        data: next,
        error: null,
      });
    } catch (error) {
      if (gen !== generation) return;
      setState({
        language,
        path: page,
        status: 'settled',
        data: undefined,
        error,
      });
      throw error;
    }
  })();

  inflightPromise = promise;
  try {
    await promise;
    return result;
  } finally {
    if (inflightKey === key && inflightPromise === promise) {
      inflightKey = null;
      inflightPromise = null;
    }
  }
}

/** Test helper — reset module state. */
export function resetPageNavStoreForTests(): void {
  generation += 1;
  inflightKey = null;
  inflightPromise = null;
  lastEnvelope = undefined;
  state = { ...INITIAL, version: state.version + 1 };
  emit();
}
