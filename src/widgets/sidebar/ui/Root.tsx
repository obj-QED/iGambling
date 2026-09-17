import type { RootProps } from '../types';
import type { ReactNode, TransitionEvent } from 'react';

import { memo, useCallback, useMemo, useState } from 'react';

import clsx from 'clsx';

import { mergeMenuCustomBlock } from '@/entities/menu';
import { LazyHost } from '@/shared/lib';
import { CmfActiveIndicatorProvider } from '@/shared/ui/CmfActiveLine';

import {
  AsideMenuSizeContext,
  SidebarConfigProvider,
  SidebarDropdownProvider,
  SidebarSlideoutProvider,
  SidebarTypePackContext,
  useSidebarSlideout,
} from '../context';
import { useAsideMenuButtonSizeFromElement } from '../hooks';
import {
  filterRenderableMenu,
  hasSidebarLayoutContent,
  splitSidebarMenu,
  toSidebarRootWidthStyle,
} from '../lib';
import { resolveSidebarLayout } from '../registry/layouts';
import { resolveSidebarTypePack } from './type';

import styles from '../styles/base/Root.module.scss';

type SidebarAsideShellProps = {
  className?: string;
  layout: string;
  type: string;
  controlFit: string;
  menuButtonSize: string;
  activeType: string;
  activePosition: string;
  rootStyle: ReturnType<typeof toSidebarRootWidthStyle>;
  width?: number | string;
  children: ReactNode;
  sidebarRef: (el: HTMLElement | null) => void;
};

function SidebarAsideShell({
  className,
  layout,
  type,
  controlFit,
  menuButtonSize,
  activeType,
  activePosition,
  rootStyle,
  width,
  children,
  sidebarRef,
}: SidebarAsideShellProps) {
  const { enabled, expanded, settled, phase, markSettled } = useSidebarSlideout();
  const expandShell = type === 'slideout' || type === 'slidein';
  const expandAttr = type === 'slidein' ? 'slidein' : 'slideout';

  const onTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLElement>) => {
      if (!enabled) return;
      if (event.target !== event.currentTarget) return;
      /* Slidein settles on overlay `transform` (Strategy) — width is post-settle only. */
      if (type === 'slidein') return;
      if (event.propertyName !== 'width') return;
      markSettled();
    },
    [enabled, markSettled, type],
  );

  return (
    <aside
      ref={sidebarRef}
      className={className}
      data-widget="sidebar"
      data-cmf-component="sidebar"
      data-layout={layout}
      data-type={type}
      data-control-fit={controlFit}
      data-control-size={menuButtonSize}
      data-cmf-active-type={activeType}
      data-cmf-active-position={activePosition}
      {...(expandShell
        ? {
            [`data-aside-${expandAttr}-expanded`]: expanded ? 'true' : 'false',
            [`data-aside-${expandAttr}-settled`]: settled ? 'true' : 'false',
            [`data-aside-${expandAttr}-phase`]: phase,
            ...(enabled ? { onTransitionEnd } : {}),
          }
        : {})}
      aria-label="Sidebar menu"
      {...(width && rootStyle && { style: rootStyle })}
    >
      {children}
    </aside>
  );
}

function RootComponent({ menu, config, className }: RootProps) {
  const [sidebarEl, setSidebarEl] = useState<HTMLElement | null>(null);
  const menuButtonSize = useAsideMenuButtonSizeFromElement(sidebarEl, config.type);
  const typePack = resolveSidebarTypePack(config.type);
  const { Strategy, styles: typeStyles } = typePack;
  const expandEnabled = config.type === 'slideout' || config.type === 'slidein';
  const expandPersistMode = config.type === 'slidein' ? 'slidein' : 'slideout';
  const chromeLayout = useMemo(() => {
    if (!menu) return null;

    const merged =
      config.customBlocks?.reduce(
        (currentMenu, customBlock) => mergeMenuCustomBlock(currentMenu, customBlock),
        menu,
      ) ?? menu;

    return splitSidebarMenu(filterRenderableMenu(merged));
  }, [menu, config.customBlocks]);

  if (!chromeLayout || !hasSidebarLayoutContent(chromeLayout)) return null;

  const rootStyle = toSidebarRootWidthStyle(config.width, { type: config.type });
  const Layout = resolveSidebarLayout(config.layout);
  const strategyNode = <Strategy layout={chromeLayout} config={config} />;

  return (
    <SidebarConfigProvider config={config}>
      <CmfActiveIndicatorProvider value={config.active}>
        <SidebarTypePackContext.Provider value={typePack}>
          <AsideMenuSizeContext.Provider value={menuButtonSize}>
            <SidebarDropdownProvider defaultOpenKeys={config.openedDropdowns}>
              <SidebarSlideoutProvider enabled={expandEnabled} persistMode={expandPersistMode}>
                <SidebarAsideShell
                  sidebarRef={setSidebarEl}
                  className={clsx(styles.root, typeStyles.root, className)}
                  layout={config.layout}
                  type={config.type}
                  controlFit={config.controlFit}
                  menuButtonSize={menuButtonSize}
                  activeType={config.active.type}
                  activePosition={config.active.position}
                  rootStyle={rootStyle}
                  width={config.width}
                >
                  <LazyHost component={Layout} layout={config.layout}>
                    {strategyNode}
                  </LazyHost>
                </SidebarAsideShell>
              </SidebarSlideoutProvider>
            </SidebarDropdownProvider>
          </AsideMenuSizeContext.Provider>
        </SidebarTypePackContext.Provider>
      </CmfActiveIndicatorProvider>
    </SidebarConfigProvider>
  );
}

export const Root = memo(RootComponent);
Root.displayName = 'AppSidebar';
