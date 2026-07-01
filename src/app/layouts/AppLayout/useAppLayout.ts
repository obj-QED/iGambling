import type { HeaderMenuModel } from '@/widgets/header/types';
import type { SidebarConfig } from '@/widgets/sidebar';

import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { useInitData } from '@api/lobby/queries/useInitData';

import { getSettings } from '@/shared/config';
import { getInitialPath } from '@/shared/lib/routing';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { type AppBannerModel, extractBannerFromInit } from '@/widgets/banner';
import { type HeaderConfig, resolveHeaderConfig } from '@/widgets/header';
import { resolveSidebarConfig } from '@/widgets/sidebar';

import { extractPageMenuFromInit } from '../lib/extractPageMenuFromInit';
import { resolveHeaderMenu } from '../lib/resolveHeaderMenu';
import { resolveSidebarMenu } from '../lib/resolveSidebarMenu';

export type UseAppLayoutResult = {
  headerMenu: HeaderMenuModel | null;
  headerConfig: HeaderConfig;
  footerMenu: HeaderMenuModel | null;
  sidebarMenu: HeaderMenuModel | null;
  sidebarConfig: SidebarConfig;
  banner: AppBannerModel | null;
  isReady: boolean;
};

export function useAppLayout(language: string, page = getInitialPath()): UseAppLayoutResult {
  const { init } = useInitData(language, page);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const headerMenu = useMemo(() => {
    return resolveHeaderMenu(init.content, { isAuthenticated });
  }, [init.content, isAuthenticated]);

  const footerMenu = useMemo(() => {
    if (init.content === undefined) return null;
    return extractPageMenuFromInit(init.content, 'footer', 'sections');
  }, [init.content]);

  const sidebarMenu = useMemo(() => {
    return resolveSidebarMenu(init.content);
  }, [init.content]);

  const banner = useMemo(() => {
    if (init.content === undefined) return null;
    return extractBannerFromInit(init.content);
  }, [init.content]);

  const headerConfig = useMemo(() => resolveHeaderConfig(getSettings()), []);
  const sidebarConfig = useMemo(() => resolveSidebarConfig(getSettings()), []);

  return {
    headerMenu,
    headerConfig,
    footerMenu,
    sidebarMenu,
    sidebarConfig,
    banner,
    isReady: init.query.status === 'success',
  };
}

/** @deprecated Use `useAppLayout` — kept for backward compatibility. */
export function useHeaderMenu(language: string, page = getInitialPath()) {
  const layout = useAppLayout(language, page);

  return {
    menu: layout.headerMenu,
    config: layout.headerConfig,
    isReady: layout.isReady && layout.headerMenu !== null,
  };
}

export type UseHeaderMenuResult = ReturnType<typeof useHeaderMenu>;
