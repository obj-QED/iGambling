import type { SidebarTypeStrategyProps } from '../../../types';
import type { ReactNode, TransitionEvent } from 'react';

import { memo, useCallback, useMemo } from 'react';

import { ScrollArea } from '@mantine/core';
import clsx from 'clsx';

import {
  SidebarConfigProvider,
  SidebarTypePackContext,
  useSidebarSlideout,
} from '../../../context';
import { hasRenderableMenuSections } from '../../../lib';
import { SidebarFooter } from '../../blocks/SidebarFooter/SidebarFooter';
import { SidebarHeader } from '../../blocks/SidebarHeader/SidebarHeader';
import { Shell } from '../../Shell';
import { TYPE_PACK_REGISTRY } from '../registry';

import rootStyles from '../../../styles/base/Root.module.scss';
import styles from '../../../styles/type/SlideinType.module.scss';

type SlideinChromeProps = {
  layout: SidebarTypeStrategyProps['layout'];
  config: SidebarTypeStrategyProps['config'];
};

function SlideinChrome({ layout, config }: SlideinChromeProps) {
  const { regions, scrollArea } = config;
  const { scrollbarSize, ...scrollAreaProps } = scrollArea;
  void scrollbarSize;

  const showHeader = regions.header && layout.headerSection;
  const showMain = regions.main && hasRenderableMenuSections(layout.mainMenu);
  const showFooter = regions.footer && layout.footerSection;

  return (
    <>
      {showHeader && <SidebarHeader section={layout.headerSection!} />}

      {showMain && (
        <ScrollArea
          className={rootStyles.scroll}
          h="100%"
          scrollbars="y"
          {...scrollAreaProps}
          classNames={{
            viewport: rootStyles.viewport,
            scrollbar: rootStyles.scrollbar,
            thumb: rootStyles.thumb,
          }}
        >
          <Shell menu={layout.mainMenu} />
        </ScrollArea>
      )}

      {showFooter && <SidebarFooter section={layout.footerSection!} />}
    </>
  );
}

type SlideinPanelProps = {
  face: 'expanded' | 'collapsed';
  active: boolean;
  onTransitionEnd?: (event: TransitionEvent<HTMLDivElement>) => void;
  children: ReactNode;
};

function SlideinPanel({ face, active, onTransitionEnd, children }: SlideinPanelProps) {
  return (
    <div
      className={clsx(
        styles.panel,
        face === 'expanded' ? styles.panelExpanded : styles.panelCollapsed,
        active ? styles.panelActive : styles.panelIdle,
      )}
      data-slidein-panel={face}
      aria-hidden={!active}
      {...(!active ? { inert: true } : {})}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  );
}

/**
 * Slidein — two full chrome blocks; only whole-block appear/disappear
 * (opacity + short translate). No track / no per-element motion.
 */
function SlideinStrategyComponent({ layout, config }: SidebarTypeStrategyProps) {
  const { phase, markSettled, enabled } = useSidebarSlideout();
  const compactPack = TYPE_PACK_REGISTRY.compact;

  const collapsedActive = phase === 'collapsed' || phase === 'collapsing';
  const expandedActive = !collapsedActive;

  const onPanelTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (!enabled) return;
      if (event.target !== event.currentTarget) return;
      if (event.propertyName !== 'opacity') return;
      markSettled();
    },
    [enabled, markSettled],
  );

  const collapsedConfig = useMemo(
    () => ({
      ...config,
      blockVariants: {
        ...config.blockVariants,
        search: 'icon' as const,
        promo: 'icon' as const,
      },
    }),
    [config],
  );

  return (
    <div className={styles.stage} data-slidein-stage="">
      <SlideinPanel
        face="expanded"
        active={expandedActive}
        onTransitionEnd={expandedActive ? undefined : onPanelTransitionEnd}
      >
        <SlideinChrome layout={layout} config={config} />
      </SlideinPanel>

      <SidebarConfigProvider config={collapsedConfig}>
        <SidebarTypePackContext.Provider value={compactPack}>
          <SlideinPanel
            face="collapsed"
            active={collapsedActive}
            onTransitionEnd={collapsedActive ? onPanelTransitionEnd : undefined}
          >
            <SlideinChrome layout={layout} config={collapsedConfig} />
          </SlideinPanel>
        </SidebarTypePackContext.Provider>
      </SidebarConfigProvider>
    </div>
  );
}

export const SlideinStrategy = memo(SlideinStrategyComponent);
SlideinStrategy.displayName = 'SidebarSlideinTypeStrategy';
