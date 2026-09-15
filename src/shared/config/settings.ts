import type { AsideSettings } from './asideSettings';
import type { BannerSettings } from './bannerSettings';
import type { FooterSettings } from './footerSettings';
import type { HeaderSettings } from './headerSettings';

import { parseAppSettings } from './parseAppSettings';

export type { AsideSettings } from './asideSettings';
export type { BannerSettings } from './bannerSettings';
export type { FooterSettings } from './footerSettings';
export type { HeaderSettings } from './headerSettings';

export type AppParams = {
  /**
   * Lobby / i18n language (`en`, `ru`). Wins over `AppSettings.language` and the document.
   */
  language?: string;
  /**
   * Mobile/tablet: request document fullscreen on first scroll.
   * Set `false` to disable.
   */
  fullscreen?: boolean;
  preloader?: {
    /**
     * Global element-skeleton switch (shell paint + adapter pulse + page skeleton).
     * `false` → no visible skeleton UI anywhere; use `ShellSkeletonGate` / `isShellSkeletonEnabled()`.
     * Omit / `true` → on. Bootstrap `GlobalPreloader` covers translation→init while chrome
     * mounts underneath; shell skeleton stays until API + paint ready.
     */
    skeleton?: boolean;
  };
  /**
   * Global Mantine Modal defaults (`themeComponents` + wrappers).
   * Any Modal prop except `opened` / `onClose` / `children`.
   * Paint tokens stay in `tokens/theme.scss` (`--cmf-modal-*`).
   * @see https://mantine.dev/core/modal/?t=props
   */
  modal?: import('./overlaySettings').ModalSettings;
  /**
   * Global Mantine Drawer defaults (`themeComponents` + AppDrawer / wrappers).
   * Any Drawer prop except `opened` / `onClose` / `children`.
   * Paint tokens stay in `tokens/theme.scss` (`--drawer-*`).
   * @see https://mantine.dev/core/drawer/?t=props
   */
  drawer?: import('./overlaySettings').DrawerSettings;
  /**
   * Global Mantine Popover defaults (`themeComponents` + PopoverWrapper).
   * Any Popover prop except `opened` / `onChange` / `children`.
   * Paint tokens stay in `tokens/theme.scss` (`--popover-*`).
   * @see https://mantine.dev/core/popover/?t=props
   */
  popover?: import('./overlaySettings').PopoverSettings;
  /**
   * Global Mantine Menu defaults (DeepPanel / other Menu hosts).
   * Any Menu prop except `opened` / `onChange` / `children`.
   * Cascade: `params.menu` → `header.menu` → instance.
   * @see https://mantine.dev/core/menu/?t=props
   */
  menu?: import('./overlaySettings').MenuSettings;
  /**
   * Global Mantine Spotlight defaults (AppSearch `type: spotlight`).
   * Cascade: `params.spotlight` → instance.
   * @see https://mantine.dev/x/spotlight/?t=props
   */
  spotlight?: import('./overlaySettings').SpotlightSettings;
  /**
   * Global search behavior for all search triggers
   * (header `search`, aside `search_leftmenu`, …).
   * Override per block via `header|aside.blockVariants`.
   * - `type`: `modal` | `spotlight` | `input`
   * - `style`: `compact` | `icon` | `input`
   * - `modal`: Modal overrides (`params.modal` → `params.search.modal`)
   */
  search?: import('./searchSettings').SearchSettings;
};

export type AppSettings = {
  appName?: string;
  version?: string;
  /** Site language when `params.language` is omitted. */
  language?: string;
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

let cachedRaw: AppSettings | undefined;
let cachedParsed: AppSettings = {};

export function resetSettingsCache(): void {
  cachedRaw = undefined;
  cachedParsed = {};
}

export function getSettings(): AppSettings {
  if (typeof globalThis === 'undefined') return {};
  const raw = (globalThis as unknown as Window).__SETTINGS__;
  if (raw === cachedRaw) return cachedParsed;
  cachedRaw = raw;
  cachedParsed = parseAppSettings(raw);
  return cachedParsed;
}

export function isScrollFullscreenEnabled(settings = getSettings()): boolean {
  return settings.params?.fullscreen === true;
}

/** Global skeleton UI. Default on; `params.preloader.skeleton: false` disables everywhere. */
export function isShellSkeletonEnabled(settings = getSettings()): boolean {
  return settings.params?.preloader?.skeleton !== false;
}
