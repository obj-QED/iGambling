import type {
  GetPageContent,
  GetPageParams,
  GetPageResponse,
  InitV2Content,
  InitV2Params,
  InitV2Response,
  TranslationResponse,
  Words,
} from './types';

import { lobbyApiClient } from '@api/baseApi';
import { API_LOBBY_PATH } from '@api/constants';
import { toApiEnvelope } from '@api/contracts';
import { assertLobbyCommand } from '@api/security';

import { toPageData } from './sanitize';

function isWords(value: unknown): value is Words {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  return Object.values(value).every((item) => typeof item === 'string');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function toWords(value: unknown): Words {
  // API может вернуть как плоский объект переводов, так и envelope { content: {...} }.
  const source = isRecord(value) && isRecord(value.content) ? value.content : value;

  if (isWords(source)) return source;
  if (!isRecord(source)) return {};

  // Не отбрасываем весь ответ целиком, если встретилось 1 нестроковое поле.
  const normalized: Words = {};
  for (const [key, item] of Object.entries(source)) {
    if (typeof item === 'string') {
      normalized[key] = item;
    }
  }
  return normalized;
}

function toInitPayload(value: unknown): InitV2Content {
  if (!isRecord(value)) return {};
  if (!Object.hasOwn(value, 'page')) {
    return { ...value };
  }
  return {
    ...value,
    page: toPageData(value.page),
  };
}

/** Include `token` in lobby JSON only when it is a non-empty string. */
function normalizedLobbyToken(token: string | null | undefined): string | undefined {
  if (token == null) return undefined;
  const trimmed = token.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function toInitV2Content(value: unknown): InitV2Content {
  return toInitPayload(value);
}

export function toGetPageContent(value: unknown): GetPageContent {
  return toInitPayload(value);
}

/** GET apiLobby.php?translation=<lang>. Вызывать перед initV2. */
export async function fetchTranslation(
  language: string,
  signal?: AbortSignal,
): Promise<TranslationResponse> {
  assertLobbyCommand('translation');
  const { data } = await lobbyApiClient.get<unknown>(API_LOBBY_PATH, {
    params: { translation: language },
    signal,
  });
  return toApiEnvelope(data, toWords);
}

export async function initV2(
  params: Omit<InitV2Params, 'cmd'>,
  signal?: AbortSignal,
): Promise<InitV2Response> {
  const cmd = assertLobbyCommand('initV2');
  const token = normalizedLobbyToken(params.token);
  const { data } = await lobbyApiClient.post<unknown>(
    API_LOBBY_PATH,
    {
      cmd,
      language: params.language,
      page: params.page,
      // Prefer httpOnly session cookie (withCredentials). Body token is legacy PHP bridge —
      // still visible in DevTools Network; backend should stop echoing tokens into JSON.
      ...(token && { token }),
    },
    { signal },
  );
  return toApiEnvelope(data, toInitV2Content);
}

/** Запрос getPage при переходах по страницам (не init). */
export async function getPage(
  params: GetPageParams,
  signal?: AbortSignal,
): Promise<GetPageResponse> {
  const cmd = assertLobbyCommand('getPage');
  const token = normalizedLobbyToken(params.token);
  const { data } = await lobbyApiClient.post<unknown>(
    API_LOBBY_PATH,
    {
      cmd,
      language: params.language,
      page: params.page,
      ...(token && { token }),
    },
    { signal },
  );
  return toApiEnvelope(data, toGetPageContent);
}
