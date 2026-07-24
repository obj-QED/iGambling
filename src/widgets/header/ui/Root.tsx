import type { RootProps } from '../types';

import { memo, useMemo, useState } from 'react';

import clsx from 'clsx';

import { HeaderMenuSizesContext } from '../context/menuSizesContext';
import { ConfigProvider } from '../context/provider';
import { useHeaderMenuSizesFromElement } from '../hooks/useHeaderMenuSizesFromElement';
import { filterRenderableMenu } from '../lib/itemUtils';
import { mergeCustomBlocks } from '../lib/mergeBlocks';
import { TYPE_STRATEGY_REGISTRY } from '../registry/strategies';

import styles from '../styles/base/Root.module.scss';

import '../registry/registerBlocks';

function RootComponent({ menu, config, className }: RootProps) {
  const [headerEl, setHeaderEl] = useState<HTMLElement | null>(null);
  const menuSizes = useHeaderMenuSizesFromElement(headerEl);
  const TypeStrategy = TYPE_STRATEGY_REGISTRY[config.type];
  const menuModel = useMemo(() => {
    const merged = mergeCustomBlocks(menu, config.customBlocks);
    return filterRenderableMenu(merged);
  }, [menu, config.customBlocks]);

  if (menuModel.sections.length === 0) {
    return null;
  }

  return (
    <ConfigProvider config={config}>
      <HeaderMenuSizesContext.Provider value={menuSizes}>
        <header
          ref={setHeaderEl}
          className={clsx(styles.root, className)}
          data-widget="header"
          data-cmf-component="header"
          data-layout={config.layout}
          data-type={config.type}
        >
          <TypeStrategy menu={menuModel} config={config} />
        </header>
      </HeaderMenuSizesContext.Provider>
    </ConfigProvider>
  );
}

export const Root = memo(RootComponent);
Root.displayName = 'Root';
