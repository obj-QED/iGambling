import type { SidebarTypeStrategyProps } from '../../../types';
import type { MenuItem as HeaderMenuItem, MenuSection as HeaderSection } from '@/entities/menu';
import type { ReactNode, TransitionEvent } from 'react';

import { memo, useCallback, useMemo } from 'react';

import { Group, ScrollArea } from '@mantine/core';
import clsx from 'clsx';

import { cmfControlAttrs } from '@/shared/lib';

import {
  SidebarConfigProvider,
  SidebarTypePackContext,
  useSidebarSlideout,
} from '../../../context';
import { hasRenderableMenuSections } from '../../../lib';
import { Logo } from '../../blocks/Logo/Logo';
import { SidebarFooter } from '../../blocks/SidebarFooter/SidebarFooter';
import { SidebarHeader } from '../../blocks/SidebarHeader/SidebarHeader';
import { Shell } from '../../Shell';
import { TYPE_PACK_REGISTRY } from '../registry';

import rootStyles from '../../../styles/base/Root.module.scss';
import headerStyles from '../../../styles/blocks/SidebarHeader.module.scss';
import styles from '../../../styles/type/SlideinType.module.scss';

const LOGO_ITEM_KEY = 'aside_header_logo';

function splitHeaderLogo(section: HeaderSection | null): {
  logoItem: HeaderMenuItem | null;
  headerWithoutLogo: HeaderSection | null;
} {
  if (section === null) {
    return { logoItem: null, headerWithoutLogo: null };
  }

  let logoItem: HeaderMenuItem | null = null;
  const rest: HeaderMenuItem[] = [];
  for (const item of section.items) {
    if (item.key === LOGO_ITEM_KEY && logoItem === null) {
      logoItem = item;
      continue;
    }
    rest.push(item);
  }

  return {
    logoItem,
    headerWithoutLogo: rest.length > 0 ? { ...section, items: rest } : null,
  };
}

type SlideinChromeProps = {
  layout: SidebarTypeStrategyProps['layout'];
  config: SidebarTypeStrategyProps['config'];
  /** Header without `aside_header_logo` — logo lives in the fixed shelf. */
  headerSection: HeaderSection | null;
};

function SlideinChrome({ layout, config, headerSection }: SlideinChromeProps) {
  const { regions, scrollArea } = config;
  const { scrollbarSize, ...scrollAreaProps } = scrollArea;
  void scrollbarSize;

  const showHeader = regions.header && headerSection !== null;
  const showMain = regions.main && hasRenderableMenuSections(layout.mainMenu);
  const showFooter = regions.footer && layout.footerSection;

  return (
    <>
      {showHeader && <SidebarHeader section={headerSection!} />}

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
 * Slidein — menu panels crossfade; logo is a single fixed shelf instance.
 * No dual faces / no wrap swap — logo must not jump while width tweens.
 */
function SlideinStrategyComponent({ layout, config }: SidebarTypeStrategyProps) {
  const { phase, markSettled, enabled } = useSidebarSlideout();
  const compactPack = TYPE_PACK_REGISTRY.compact;

  const collapsedActive = phase === 'collapsed' || phase === 'collapsing';
  const expandedActive = !collapsedActive;

  const { logoItem, headerWithoutLogo } = useMemo(
    () => splitHeaderLogo(layout.headerSection),
    [layout.headerSection],
  );

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

  const showLogoShelf = config.regions.header && logoItem !== null;

  return (
    <div className={styles.shell}>
      {showLogoShelf && (
        <div className={styles.logoShelf} data-slidein-logo-shelf="">
          <Group
            className={clsx(headerStyles.row, styles.logoRow)}
            {...cmfControlAttrs({ component: 'sidebar-header', key: 'logo' })}
          >
            <Logo item={logoItem!} />
          </Group>
        </div>
      )}

      <div className={styles.stage} data-slidein-stage="">
        <SlideinPanel
          face="expanded"
          active={expandedActive}
          onTransitionEnd={expandedActive ? undefined : onPanelTransitionEnd}
        >
          <SlideinChrome layout={layout} config={config} headerSection={headerWithoutLogo} />
        </SlideinPanel>

        <SidebarConfigProvider config={collapsedConfig}>
          <SidebarTypePackContext.Provider value={compactPack}>
            <SlideinPanel
              face="collapsed"
              active={collapsedActive}
              onTransitionEnd={collapsedActive ? onPanelTransitionEnd : undefined}
            >
              <SlideinChrome
                layout={layout}
                config={collapsedConfig}
                headerSection={headerWithoutLogo}
              />
            </SlideinPanel>
          </SidebarTypePackContext.Provider>
        </SidebarConfigProvider>
      </div>
    </div>
  );
}

export const SlideinStrategy = memo(SlideinStrategyComponent);
SlideinStrategy.displayName = 'SidebarSlideinTypeStrategy';
