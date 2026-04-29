/** Navigation chip shown in the header providers strip (`window.__SETTINGS__.header.providers`). */
export type HeaderProviderItem = {
  key: string;
  name: string;
  url: string;
  /** Optional logo URL */
  img?: string;
  buttonVariant?: HeaderButtonVariant;
  buttonColor?: string;
  buttonSize?: HeaderButtonSize;
  buttonRadius?: HeaderButtonRadius;
};

export type HeaderButtonVariant = 'filled' | 'light' | 'outline' | 'subtle' | 'default';
export type HeaderButtonSize =
  | 'compact-xs'
  | 'compact-sm'
  | 'compact-md'
  | 'compact-lg'
  | 'compact-xl'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';
export type HeaderButtonRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export type HeaderActionButtonSettings = {
  label?: string;
  url?: string;
  variant?: HeaderButtonVariant;
  color?: string;
  size?: HeaderButtonSize;
  radius?: HeaderButtonRadius;
};

export type HeaderSettings = {
  layout?: 'container' | 'container-fluid';
  type?: 'default' | 'classic';
  /** Provider shortcuts with icons/links (see `AppHeaderProvidersNav`). */
  providers?: HeaderProviderItem[];
  authButtons?: {
    login?: HeaderActionButtonSettings;
    register?: HeaderActionButtonSettings;
  };
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
