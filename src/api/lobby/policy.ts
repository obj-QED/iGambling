export const LOBBY_QUERY_POLICY = {
  translation: {
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  },
  init: {
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  },
  page: {
    staleTime: 60 * 1000,
    gcTime: 30 * 60 * 1000,
  },
} as const;
