import type { HeaderSettings } from './headerSettings';

export type { HeaderSettings } from './headerSettings';

export type AppParams = {
  /**
   * Mobile/tablet: request document fullscreen on first scroll.
   * Set `false` to disable.
   */
  fullWidth?: boolean;
};

export type AppSettings = {
  appName?: string;
  version?: string;
  params?: AppParams;
  /**
   * Optional anonymous lobby token injected with HTML (not in Redux).
   * Prefer server `httpOnly` session; use only when backend requires a visible bootstrap token.
   */
  lobbyToken?: string;
  header?: HeaderSettings;
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

export function isScrollFullscreenEnabled(settings = getSettings()): boolean {
  return settings.params?.fullWidth === true;
}
