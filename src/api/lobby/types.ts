import type { ApiEnvelope } from '../types';

/** Lobby page payload is an open map — any key, any value. */
export type PageData = {
  readonly [key: string]: unknown;
};

export type InitV2Params = {
  cmd: 'initV2';
  language: string;
  page: string;
  token?: string | null;
};

/** Init/getPage content is an open map; known keys are documented for consumers. */
export type InitV2Content = {
  readonly [key: string]: unknown;
  page?: PageData;
  token?: unknown;
  id?: unknown;
  user?: unknown;
};

export type GetPageContent = InitV2Content;

export type GetPageParams = {
  language: string;
  page: string;
  token?: string | null;
};

/** Dynamic i18n dictionary — keys are not a closed set. */
export type Words = Record<string, string>;

export type TranslationResponse = ApiEnvelope<Words>;
export type InitV2Response = ApiEnvelope<InitV2Content>;
export type GetPageResponse = ApiEnvelope<GetPageContent>;
