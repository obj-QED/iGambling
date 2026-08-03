import type { RootProps } from '../types';
import type { CSSProperties } from 'react';

import { memo, useMemo, useState } from 'react';

import clsx from 'clsx';

import { mergeCustomBlock } from '@/widgets/header';

import {
  AsideMenuSizeContext,
  SidebarConfigProvider,
  SidebarDropdownProvider,
  SidebarTypePackContext,
} from '../context';
import { useAsideMenuButtonSizeFromElement } from '../hooks';
import {
  filterRenderableMenu,
  hasSidebarLayoutContent,
  splitSidebarMenu,
  toSidebarWidthCss,
} from '../lib';
import { resolveSidebarTypePack } from '../typePacks';

import styles from '../styles/base/Root.module.scss';

import '../registry/registerBlocks';

function RootComponent({ menu, config, className }: RootProps) {
  const [sidebarEl, setSidebarEl] = useState<HTMLElement | null>(null);
  const menuButtonSize = useAsideMenuButtonSizeFromElement(sidebarEl);
  const typePack = resolveSidebarTypePack(config.type);
  const { Strategy, styles: typeStyles } = typePack;
  const layout = useMemo(() => {
    if (!menu) return null;

    const merged =
      config.customBlocks?.reduce(
        (currentMenu, customBlock) => mergeCustomBlock(currentMenu, customBlock),
        menu,
      ) ?? menu;

    return splitSidebarMenu(filterRenderableMenu(merged));
  }, [menu, config.customBlocks]);

  if (!layout || !hasSidebarLayoutContent(layout)) return null;

  const widthCss = toSidebarWidthCss(config.width);
  const rootStyle =
    widthCss &&
    ({
      '--app-layout-sidebar-width': widthCss,
      ...(config.type !== 'compact' && { minWidth: 'max-content' }),
    } as CSSProperties);

  return (
    <SidebarConfigProvider config={config}>
      <SidebarTypePackContext.Provider value={typePack}>
        <AsideMenuSizeContext.Provider value={menuButtonSize}>
          <SidebarDropdownProvider defaultOpenKeys={config.openedDropdowns}>
            <aside
              ref={setSidebarEl}
              className={clsx(styles.root, typeStyles.root, className)}
              data-widget="sidebar"
              data-cmf-component="sidebar"
              data-layout={config.layout}
              data-type={config.type}
              aria-label="Sidebar menu"
              {...(config.width && rootStyle && { style: rootStyle })}
            >
              <Strategy layout={layout} config={config} />
            </aside>
          </SidebarDropdownProvider>
        </AsideMenuSizeContext.Provider>
      </SidebarTypePackContext.Provider>
    </SidebarConfigProvider>
  );
}

export const Root = memo(RootComponent);
Root.displayName = 'AppSidebar';
