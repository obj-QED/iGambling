import type { AppHeaderData, AppHeaderLayout, AppHeaderParams, AppHeaderVariant } from '../types/AppHeader.types';

import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { type PageData, useCurrentPageDataState } from '@/api/lobby';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useLanguage } from '@/hooks/useLanguage';
import { getHeaderSettings } from '@/shared/config';
import { isRecord } from '@/shared/lib';

export type UseAppHeaderStateResult = {
  params: AppHeaderParams;
  data: AppHeaderData;
  /** Показывать скелетон: нет меню в разметке и запрос ещё pending/fetching. */
  loading: boolean;
  error: unknown | null;
  isAuthenticated: boolean;
};

const DEFAULT_LAYOUT: AppHeaderLayout = 'container';
const DEFAULT_VARIANT: AppHeaderVariant = 'default';

function resolveParams(): AppHeaderParams {
  const header = getHeaderSettings();
  return {
    layout: header.layout === 'container-fluid' ? 'container-fluid' : DEFAULT_LAYOUT,
    variant: header.type === 'classic' ? 'classic' : DEFAULT_VARIANT,
  };
}

function findMenuHeaderTop(page: PageData | undefined): AppHeaderData {
  if (!page) return undefined;
  const blocks = page.blocks;
  if (!Array.isArray(blocks)) return undefined;
  const block = blocks.find((b: unknown) => isRecord(b) && b.type === 'menuHeaderTop');
  if (!isRecord(block)) return undefined;
  return {
    buttonSearch: typeof block.buttonSearch === 'string' ? block.buttonSearch : '',
    type: typeof block.type === 'string' ? block.type : '',
    menu: Array.isArray(block.menu) ? block.menu : [],
  };
}

export function useAppHeaderState(): UseAppHeaderStateResult {
  const language = useLanguage();
  const { pathname } = useLocation();
  const { data: pageData, loading: queryPending, error, isFetching } = useCurrentPageDataState(
    language,
    pathname || '/',
  );
  const { isAuthenticated } = useAuthSession();

  const params = useMemo(() => resolveParams(), []);
  const data = useMemo(() => findMenuHeaderTop(pageData), [pageData]);

  const loading = useMemo(
    () => Boolean(data === undefined && !error && (queryPending || isFetching)),
    [data, error, queryPending, isFetching],
  );

  return { params, data, loading, error, isAuthenticated };
}
