import type { lobbyQueryKeys } from './queryKeys';
import type { QueryFunctionContext } from '@tanstack/react-query';

import { getLobbySessionTokenSnapshot } from './lobbySession';
import { fetchTranslation, getPage, initV2 } from './requests';

export type TranslationKey = ReturnType<typeof lobbyQueryKeys.translation>;
export type InitKey = ReturnType<typeof lobbyQueryKeys.init>;
export type PageKey = ReturnType<typeof lobbyQueryKeys.page>;

function nonEmptyString(value: string | null | undefined): string | undefined {
  if (value == null) return undefined;
  const t = value.trim();
  return t.length > 0 ? t : undefined;
}

export function initQueryFn({ queryKey: [, , language, page] }: QueryFunctionContext<InitKey>) {
  const token = nonEmptyString(getLobbySessionTokenSnapshot());
  const params = token === undefined ? { language, page } : { language, page, token };
  // Bootstrap: do not read `signal`. Accessing it marks the query abortable, and
  // StrictMode unmount then cancels the in-flight translation→init pair (second language request).
  return initV2(params);
}

export function translationQueryFn({
  queryKey: [, , language],
}: QueryFunctionContext<TranslationKey>) {
  return fetchTranslation(language);
}

export function pageQueryFn({
  queryKey: [, , language, page],
  signal,
}: QueryFunctionContext<PageKey>) {
  const trimmed = nonEmptyString(getLobbySessionTokenSnapshot());
  const params = trimmed === undefined ? { language, page } : { language, page, token: trimmed };
  return getPage(params, signal);
}
