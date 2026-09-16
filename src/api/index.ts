/**
 * Публичный API слоя. Импорты снаружи — только из `@/api` или `@/api/lobby`, `@/api/auth` и т.д.
 */
export type { InvalidResponseSnapshot } from './baseApi';
export { baseApi, lobbyApiClient } from './baseApi';
export {
  getInvalidResponse,
  InvalidResponseError,
  reportInvalidResponse,
  resetInvalidResponse,
  ServerError,
  subscribeInvalidResponse,
} from './baseApi';
export { API_LOBBY_PATH } from './constants';
export { useApiMutation, useApiQuery } from './hooks';
export type {
  GetPageContent,
  GetPageParams,
  GetPageResponse,
  InitV2Content,
  InitV2Params,
  InitV2Response,
  PageData,
  TranslationResponse,
} from './lobby';
export {
  fetchTranslation,
  getPage,
  initV2,
  lobbyQueryKeys,
  prefetchInitData,
  useGetPage,
  useInitData,
  useInvalidateInit,
  useTranslation,
} from './lobby';
export { queryClient } from './queryClient';
export type { ApiEnvelope } from './types';
export type {
  UseApiMutationParams,
  UseApiMutationResult,
  UseApiQueryParams,
  UseApiQueryResult,
} from './types';
