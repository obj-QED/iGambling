/** Ключи запросов lobby для TanStack Query */
export const lobbyQueryKeys = {
  all: ['lobby'] as const,
  translation: (language: string) => ['lobby', 'translation', language] as const,
  init: (language: string, page: string) => ['lobby', 'init', language, page] as const,
  page: (language: string, page: string, token?: string | null) =>
    ['lobby', 'page', language, page, token ?? null] as const,
};
