import type { RootProps } from '../types';
import type { CSSProperties } from 'react';

import { memo, useMemo, useState } from 'react';

import { ScrollArea } from '@mantine/core';
import clsx from 'clsx';

import { mergeCustomBlock } from '@/widgets/header';

import { AsideMenuSizeContext } from '../context/asideMenuSizeContext';
import { SidebarConfigProvider } from '../context/provider';
import { SidebarDropdownProvider } from '../context/sidebarDropdownProvider';
import { useAsideMenuButtonSizeFromElement } from '../hooks/useAsideMenuButtonSizeFromElement';
import { filterRenderableMenu } from '../lib/itemUtils';
import { hasSidebarLayoutContent, splitSidebarMenu } from '../lib/splitSidebarMenu';
import { TYPE_STRATEGY_REGISTRY } from '../registry/strategies';
import { SidebarFooter } from './layout/SidebarFooter/SidebarFooter';
import { SidebarHeader } from './layout/SidebarHeader/SidebarHeader';

import scrollAreaStyles from '../styles/base/AsideScrollArea.module.scss';
import styles from '../styles/base/Root.module.scss';

import '../registry/registerBlocks';

function RootComponent({ menu, config, className }: RootProps) {
  const [sidebarEl, setSidebarEl] = useState<HTMLElement | null>(null);
  const menuButtonSize = useAsideMenuButtonSizeFromElement(sidebarEl);
  const TypeStrategy = TYPE_STRATEGY_REGISTRY[config.type];
  const layout = useMemo(() => {
    if (menu === null) return null;

    const merged =
      config.customBlocks?.reduce(
        (currentMenu, customBlock) => mergeCustomBlock(currentMenu, customBlock),
        menu,
      ) ?? menu;

    return splitSidebarMenu(filterRenderableMenu(merged));
  }, [menu, config.customBlocks]);

  if (layout === null || hasSidebarLayoutContent(layout) === false) {
    return null;
  }

  const rootStyle = {
    '--app-layout-sidebar-width': `${config.width}px`,
  } as CSSProperties;

  return (
    <SidebarConfigProvider config={config}>
      <AsideMenuSizeContext.Provider value={menuButtonSize}>
        <SidebarDropdownProvider defaultOpenKeys={config.openedDropdowns}>
          <aside
            ref={setSidebarEl}
            className={clsx(styles.root, className)}
            style={rootStyle}
            data-widget="sidebar"
            data-cmf-component="sidebar"
            data-type={config.type}
            aria-label="Sidebar menu"
          >
            {layout.headerSection !== null ? (
              <SidebarHeader section={layout.headerSection} />
            ) : null}

            {layout.mainMenu.sections.length > 0 ? (
              <ScrollArea
                className={styles.scroll}
                classNames={{
                  content: styles.scrollContent,
                  scrollbar: scrollAreaStyles.scrollbar,
                }}
                h="100%"
                type={config.scrollArea.type}
                scrollbars="y"
                offsetScrollbars
                overscrollBehavior={config.scrollArea.overscrollBehavior}
                scrollbarSize={config.scrollArea.scrollbarSize}
                scrollHideDelay={config.scrollArea.scrollHideDelay}
              >
                <TypeStrategy menu={layout.mainMenu} config={config} />
              </ScrollArea>
            ) : null}

            {layout.footerSection !== null ? (
              <SidebarFooter section={layout.footerSection} />
            ) : null}
          </aside>
        </SidebarDropdownProvider>
      </AsideMenuSizeContext.Provider>
    </SidebarConfigProvider>
  );
}

export const Root = memo(RootComponent);
Root.displayName = 'AppSidebar';
