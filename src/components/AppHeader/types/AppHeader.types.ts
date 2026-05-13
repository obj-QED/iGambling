import type { ReactNode } from 'react';

/** Unified class map from `AppHeaderBase.module.scss` — imported in `AppHeader` and passed down. */
export type AppHeaderBaseStyles = typeof import('../styles/base/AppHeaderBase.module.scss').default;

export type AppHeaderLayout = 'container' | 'container-fluid';
export type AppHeaderVariant = 'default' | 'classic';

export type AppHeaderLayoutProps = {
  children: ReactNode;
};

export type AppHeaderParams = {
  layout: AppHeaderLayout;
  variant: AppHeaderVariant;
};

export type AppHeaderMenuItem = {
  url?: string;
  name?: string;
  key: string;
  img?: string;
  buttonVariant?: 'filled' | 'light' | 'outline' | 'subtle' | 'default';
  buttonColor?: string;
  buttonSize?:
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
  buttonRadius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  items?: AppHeaderMenuItem[];
};

export type AppHeaderData =
  | {
      buttonSearch: string;
      type: string;
      menu: AppHeaderMenuItem[];
    }
  | undefined;

export type AppHeaderViewProps = {
  params: AppHeaderParams;
  data: AppHeaderData;
  /** Skeleton: true while `data` (menuHeaderTop) is missing and request is pending/fetching (see useAppHeaderState). */
  loading: boolean;
  /** Page/init request error; hide skeleton when error is present. */
  error: unknown | null;
  isAuthenticated: boolean;
};
