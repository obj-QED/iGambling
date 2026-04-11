export type SettingsProvider = {
  name: string;
  icon: string;
  url: string;
};

export type HeaderSettings = {
  layout?: 'container' | 'container-fluid';
  type?: 'default' | 'classic';
  providers?: SettingsProvider[];
};

export type AppSettings = {
  appName?: string;
  version?: string;
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

export function getHeaderSettings(): HeaderSettings {
  return getSettings().header ?? {};
}
