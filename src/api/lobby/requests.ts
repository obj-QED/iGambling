import type {
  GetPageContent,
  GetPageParams,
  GetPageResponse,
  InitV2Content,
  InitV2Params,
  InitV2Response,
  PageData,
  TranslationResponse,
  Words,
} from './types';

import { lobbyApiClient } from '@/api/baseApi';
import { API_LOBBY_PATH } from '@/api/constants';
import { toApiEnvelope } from '@/api/contracts';

function isWords(value: unknown): value is Words {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  return Object.values(value).every(item => typeof item === 'string');
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

function toPageData(value: unknown): PageData | undefined {
  if (!isRecord(value)) return undefined;
  return { ...value };
}

export function toInitV2Content(value: unknown): InitV2Content {
  if (!isRecord(value)) return {};
  const nextPayload: InitV2Content = { ...value };
  if ('page' in value) {
    nextPayload.page = toPageData(value.page);
  }
  return nextPayload;
}

export function toGetPageContent(value: unknown): GetPageContent {
  if (!isRecord(value)) return {};
  const nextPayload: GetPageContent = { ...value };
  if ('page' in value) {
    nextPayload.page = toPageData(value.page);
  }
  return nextPayload;
}

/** GET apiLobby.php?translation=<lang>. Вызывать перед initV2. */
export async function fetchTranslation(language: string, signal?: AbortSignal): Promise<TranslationResponse> {
  const { data } = await lobbyApiClient.get<unknown>(API_LOBBY_PATH, {
    params: { translation: language },
    signal,
  });
  return toApiEnvelope(data, toWords);
}

/** Запрос initV2 на apiLobby (https://999ggg.net/apiLobby.php) */
export async function initV2(params: Omit<InitV2Params, 'cmd'>, signal?: AbortSignal): Promise<InitV2Response> {
  const { data } = await lobbyApiClient.post<unknown>(
    API_LOBBY_PATH,
    {
      cmd: 'initV2',
      language: params.language,
      page: params.page,
    },
    { signal },
  );
  return toApiEnvelope(data, toInitV2Content);
}

/** Запрос getPage при переходах по страницам (не init). */
export async function getPage(params: GetPageParams, signal?: AbortSignal): Promise<GetPageResponse> {
  const { data } = await lobbyApiClient.post<unknown>(
    API_LOBBY_PATH,
    {
      cmd: 'getPage',
      language: params.language,
      page: params.page,
      token: params.token ?? null,
    },
    { signal },
  );
  return toApiEnvelope(data, toGetPageContent);
}
