import type { HeaderProviderItem } from '../types/AppHeader.types';

import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { type PageData, useCurrentPageDataState } from '@/api/lobby';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useLanguage } from '@/hooks/useLanguage';

import { resolveHeaderProviders } from '../lib/resolveHeaderProviders';

export type UseAppHeaderStateResult = {
  loading: boolean;
  isAuthenticated: boolean;
  /** `meta_title` из ответа страницы (init / getPage). */
  title: string;
  /** URL лого из `page.logo` (ответ init/getPage). */
  logoUrl: string | undefined;
  /** `window.__SETTINGS__.header.providers`. */
  providers: HeaderProviderItem[];
};

function pickPageTitle(page: PageData | undefined): string {
  if (!page || typeof page !== 'object') return '';
  const t = (page as Record<string, unknown>).meta_title;
  return typeof t === 'string' ? t : '';
}

function pickPageLogo(page: PageData | undefined): string | undefined {
  if (!page || typeof page !== 'object') return undefined;
  const logo = (page as Record<string, unknown>).logo;
  if (typeof logo === 'string' && logo.length > 0) return logo;
  return undefined;
}

export function useAppHeaderState(): UseAppHeaderStateResult {
  const language = useLanguage();
  const { pathname } = useLocation();
  const { data, loading } = useCurrentPageDataState(language, pathname || '/');
  const { isAuthenticated } = useAuthSession();

  const title = useMemo(() => pickPageTitle(data), [data]);
  const logoUrl = useMemo(() => pickPageLogo(data), [data]);
  const providers = useMemo(() => resolveHeaderProviders(), []);

  return {
    loading,
    isAuthenticated,
    title,
    logoUrl,
    providers,
  };
}
