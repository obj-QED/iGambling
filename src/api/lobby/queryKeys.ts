/** Ключи запросов lobby для TanStack Query */
export const lobbyQueryKeys = {
  all: ['lobby'] as const,
  translation: (language: string) => ['lobby', 'translation', language] as const,
  init: (language: string, page: string) => ['lobby', 'init', language, page] as const,
  /** `sessionRevision` comes from {@link getLobbySessionRevision} — not a credential. */
  page: (language: string, page: string, sessionRevision: number) =>
    ['lobby', 'page', language, page, sessionRevision] as const,
};
