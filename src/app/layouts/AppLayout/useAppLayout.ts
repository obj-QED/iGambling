import type { HeaderMenuModel } from '@/widgets/header/types';

import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { useInitData } from '@api/lobby/queries/useInitData';

import { getSettings } from '@/shared/config';
import { getInitialPath } from '@/shared/lib/routing';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import {
  type AppBannerModel,
  type BannerSchema,
  extractBannerFromInit,
  resolveBannerSchema,
} from '@/widgets/banner';
import { type FooterSchema, resolveFooterSchema } from '@/widgets/footer';
import { type HeaderSchema, resolveHeaderSchema } from '@/widgets/header';
import { resolveSidebarSchema, type SidebarSchema } from '@/widgets/sidebar';

import { extractMenuFromInit } from '../lib/extractPageMenuFromInit';
import { resolveHeaderMenu } from '../lib/resolveHeaderMenu';
import { resolveSidebarMenu } from '../lib/resolveSidebarMenu';

export type UseAppLayoutResult = {
  headerMenu: HeaderMenuModel | null;
  headerConfig: HeaderSchema;
  footerMenu: HeaderMenuModel | null;
  footerSchema: FooterSchema;
  sidebarMenu: HeaderMenuModel | null;
  sidebarConfig: SidebarSchema;
  banner: AppBannerModel | null;
  bannerSchema: BannerSchema;
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
    return extractMenuFromInit(init.content, 'footer', 'sections');
  }, [init.content]);

  const sidebarMenu = useMemo(() => {
    return resolveSidebarMenu(init.content);
  }, [init.content]);

  const banner = useMemo(() => {
    if (init.content === undefined) return null;
    return extractBannerFromInit(init.content);
  }, [init.content]);

  const headerConfig = useMemo(
    () =>
      resolveHeaderSchema({ global: getSettings().header as Partial<HeaderSchema> | undefined }),
    [],
  );
  const sidebarConfig = useMemo(
    () =>
      resolveSidebarSchema({ global: getSettings().aside as Partial<SidebarSchema> | undefined }),
    [],
  );
  const bannerSchema = useMemo(
    () =>
      resolveBannerSchema({ global: getSettings().banner as Partial<BannerSchema> | undefined }),
    [],
  );
  const footerSchema = useMemo(
    () =>
      resolveFooterSchema({ global: getSettings().footer as Partial<FooterSchema> | undefined }),
    [],
  );

  return {
    headerMenu,
    headerConfig,
    footerMenu,
    footerSchema,
    sidebarMenu,
    sidebarConfig,
    banner,
    bannerSchema,
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
