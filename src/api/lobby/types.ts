import type { ApiEnvelope } from '../types';

export type LobbyPayload = Record<string, unknown>;

export type PageData = LobbyPayload;

export type InitV2Params = {
  cmd: 'initV2';
  language: string;
  page: string;
  token?: string | null;
};

export type InitV2Content = LobbyPayload;
export type GetPageContent = LobbyPayload;

export type GetPageParams = {
  language: string;
  page: string;
  token?: string | null;
};

export type Words = Record<string, string>;

export type TranslationResponse = ApiEnvelope<Words>;
export type InitV2Response = ApiEnvelope<InitV2Content>;
export type GetPageResponse = ApiEnvelope<GetPageContent>;
