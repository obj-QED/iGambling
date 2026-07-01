import type { RootProps } from '../types';
import type { CSSProperties } from 'react';

import { memo, useMemo } from 'react';

import clsx from 'clsx';

import { mergeCustomBlock } from '@/widgets/header';

import { SidebarConfigProvider } from '../context/provider';
import { filterRenderableMenu } from '../lib/itemUtils';
import { TYPE_STRATEGY_REGISTRY } from '../registry/strategies';

import styles from '../styles/base/Root.module.scss';

import '../registry/registerBlocks';

function RootComponent({ menu, config, className }: RootProps) {
  const TypeStrategy = TYPE_STRATEGY_REGISTRY[config.type];
  const menuModel = useMemo(() => {
    if (menu === null) return null;

    const merged =
      config.customBlocks?.reduce(
        (currentMenu, customBlock) => mergeCustomBlock(currentMenu, customBlock),
        menu,
      ) ?? menu;

    return filterRenderableMenu(merged);
  }, [menu, config.customBlocks]);

  if (TypeStrategy === undefined || menuModel === null || menuModel.sections.length === 0) {
    return null;
  }

  const rootStyle = {
    '--app-layout-sidebar-width': `${config.width}px`,
  } as CSSProperties;

  return (
    <SidebarConfigProvider config={config}>
      <aside
        className={clsx(styles.root, className)}
        style={rootStyle}
        data-widget="sidebar"
        data-cmf-component="sidebar"
        data-type={config.type}
        aria-label="Sidebar menu"
      >
        <div className={styles.scroll} data-sidebar-scroll>
          <TypeStrategy menu={menuModel} config={config} />
        </div>
      </aside>
    </SidebarConfigProvider>
  );
}

export const Root = memo(RootComponent);
Root.displayName = 'AppSidebar';
