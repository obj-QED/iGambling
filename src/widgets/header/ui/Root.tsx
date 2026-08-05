import type { RootProps } from '../types';

import { memo, useMemo, useState } from 'react';

import clsx from 'clsx';

import { ConfigProvider, HeaderMenuSizesContext } from '../context';
import { useHeaderMenuSizesFromElement } from '../hooks';
import { filterRenderableMenu, mergeCustomBlocks } from '../lib';
import { resolveHeaderTypePack } from './type';

import styles from '../styles/base/Root.module.scss';

import '../registry/registerBlocks';

function RootComponent({ menu, config, className }: RootProps) {
  const [headerEl, setHeaderEl] = useState<HTMLElement | null>(null);
  const menuSizes = useHeaderMenuSizesFromElement(headerEl);
  const typePack = resolveHeaderTypePack(config.type);
  const { Strategy, styles: typeStyles } = typePack;
  const menuModel = useMemo(() => {
    const merged = mergeCustomBlocks(menu, config.customBlocks);
    return filterRenderableMenu(merged);
  }, [menu, config.customBlocks]);

  if (!menuModel.sections.length) return null;

  return (
    <ConfigProvider config={config}>
      <HeaderMenuSizesContext.Provider value={menuSizes}>
        <header
          ref={setHeaderEl}
          className={clsx(styles.root, typeStyles.root, className)}
          data-widget="header"
          data-cmf-component="header"
          data-layout={config.layout}
          data-type={config.type}
          data-sticky={config.behavior.sticky ? 'true' : undefined}
          data-transparent={config.behavior.transparent ? 'true' : undefined}
          data-hide-on-scroll={config.behavior.hideOnScroll ? 'true' : undefined}
        >
          <Strategy menu={menuModel} config={config} />
        </header>
      </HeaderMenuSizesContext.Provider>
    </ConfigProvider>
  );
}

export const Root = memo(RootComponent);
Root.displayName = 'Root';
