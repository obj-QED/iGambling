/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_LOBBY_API_URL?: string;
  /** Dev only: seed lobby `token` for `initV2` / `getPage` (use `.env.local`, never commit secrets). */
  readonly VITE_DEV_LOBBY_TOKEN?: string;
  /** Set by Storybook Vite config — no backend bootstrap in stories. */
  readonly STORYBOOK?: string;
  /**
   * Injected from `PROFILER_ENABLED` in `.env.local` (Vite `define`).
   * `true` only — React `<Profiler>` stays off otherwise.
   */
  readonly PROFILER_ENABLED?: boolean;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

export {};

declare global {
  interface Window {
    /**
     * Dev only: `window.__DEV_SET_LOBBY_TOKEN__('1383_…')` — set in `main.tsx` when `import.meta.env.DEV`.
     * Call `clearLobbySession()` from `@api/lobby` to drop the in-memory token.
     */
    __DEV_SET_LOBBY_TOKEN__?: (token: string) => void;
  }
}
