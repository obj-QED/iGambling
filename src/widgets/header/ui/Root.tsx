import type { RootProps } from '../types';

import { memo, useMemo } from 'react';

import clsx from 'clsx';

import { ConfigProvider } from '../context/provider';
import { filterRenderableMenu } from '../lib/itemUtils';
import { mergeCustomBlocks } from '../lib/mergeBlocks';
import { TYPE_STRATEGY_REGISTRY } from '../registry/strategies';

import styles from '../styles/base/Root.module.scss';

import '../registry/registerBlocks';

function RootComponent({ menu, config, className }: RootProps) {
  const TypeStrategy = TYPE_STRATEGY_REGISTRY[config.type];
  const menuModel = useMemo(() => {
    const merged = mergeCustomBlocks(menu, config.customBlocks);
    return filterRenderableMenu(merged);
  }, [menu, config.customBlocks]);

  if (TypeStrategy === undefined || menuModel.sections.length === 0) {
    return null;
  }

  return (
    <ConfigProvider config={config}>
      <header
        className={clsx(styles.root, className)}
        data-layout={config.layout}
        data-type={config.type}
        data-icon-shape="square"
      >
        <TypeStrategy menu={menuModel} config={config} />
      </header>
    </ConfigProvider>
  );
}

export const Root = memo(RootComponent);
Root.displayName = 'Root';
