import type { HeaderMenuModel } from '@/widgets/header/types';

import { useMemo } from 'react';

import { useInitData } from '@api/lobby/queries/useInitData';

import { getSettings } from '@/shared/config';
import { getInitialPath } from '@/shared/lib/routing';
import { type AppBannerModel, extractBannerFromInit } from '@/widgets/banner';
import { type HeaderConfig, resolveHeaderConfig } from '@/widgets/header';

import { extractPageMenuFromInit } from '../lib/extractPageMenuFromInit';
import { resolveHeaderMenu } from '../lib/resolveHeaderMenu';

export type UseAppLayoutResult = {
  headerMenu: HeaderMenuModel | null;
  headerConfig: HeaderConfig;
  footerMenu: HeaderMenuModel | null;
  sidebarMenu: HeaderMenuModel | null;
  banner: AppBannerModel | null;
  isReady: boolean;
};

export function useAppLayout(language: string, page = getInitialPath()): UseAppLayoutResult {
  const { init } = useInitData(language, page);

  const headerMenu = useMemo(() => {
    return resolveHeaderMenu(init.content);
  }, [init.content]);

  const footerMenu = useMemo(() => {
    if (init.content === undefined) return null;
    return extractPageMenuFromInit(init.content, 'footer', 'sections');
  }, [init.content]);

  const sidebarMenu = useMemo(() => {
    if (init.content === undefined) return null;
    return extractPageMenuFromInit(init.content, 'left', 'flat');
  }, [init.content]);

  const banner = useMemo(() => {
    if (init.content === undefined) return null;
    return extractBannerFromInit(init.content);
  }, [init.content]);

  const headerConfig = useMemo(() => resolveHeaderConfig(getSettings()), []);

  return {
    headerMenu,
    headerConfig,
    footerMenu,
    sidebarMenu,
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
