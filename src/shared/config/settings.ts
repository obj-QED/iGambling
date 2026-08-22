import type { AsideSettings } from './asideSettings';
import type { BannerSettings } from './bannerSettings';
import type { FooterSettings } from './footerSettings';
import type { HeaderSettings } from './headerSettings';

export type { AsideSettings } from './asideSettings';
export type { BannerSettings } from './bannerSettings';
export type { FooterSettings } from './footerSettings';
export type { HeaderSettings } from './headerSettings';

export type AppParams = {
  /**
   * Mobile/tablet: request document fullscreen on first scroll.
   * Set `false` to disable.
   */
  fullscreen?: boolean;
  preloader?: {
    /**
     * Global element-skeleton switch (shell paint + adapter pulse + page skeleton).
     * `false` → no visible skeleton UI anywhere; use `ShellSkeletonGate` / `isShellSkeletonEnabled()`.
     * Omit / `true` → on. Bootstrap `GlobalPreloader` is separate and still runs.
     */
    skeleton?: boolean;
  };
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
  aside?: AsideSettings;
  banner?: BannerSettings;
  footer?: FooterSettings;
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
  return settings.params?.fullscreen === true;
}

/** Global skeleton UI. Default on; `params.preloader.skeleton: false` disables everywhere. */
export function isShellSkeletonEnabled(settings = getSettings()): boolean {
  return settings.params?.preloader?.skeleton !== false;
}
