export type AppSettings = {
  appName?: string;
  version?: string;
  /**
   * Optional anonymous lobby token injected with HTML (not in Redux).
   * Prefer server `httpOnly` session; use only when backend requires a visible bootstrap token.
   */
  lobbyToken?: string;
};

declare global {
  interface Window {
    __SETTINGS__?: AppSettings;
  }
}

export function getSettings(): AppSettings {
  if (typeof globalThis === 'undefined') return {};
  return (globalThis as unknown as Window).__SETTINGS__ ?? {};
}
