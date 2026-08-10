import type { SidebarTypeStrategyProps } from '../../../types';

import { memo } from 'react';

import { ScrollArea } from '@mantine/core';

import { hasRenderableMenuSections } from '../../../lib';
import { SidebarFooter } from '../../blocks/SidebarFooter/SidebarFooter';
import { SidebarHeader } from '../../blocks/SidebarHeader/SidebarHeader';
import { Shell } from '../../Shell';

import styles from '../../../styles/base/Root.module.scss';

/**
 * Compact type chrome — owns the full aside tree for this pack (narrow ActionIcon rail).
 * Not shared with default: reshape regions, scroll, shell, or inject type-only chrome here.
 *
 * Layout slots (override per product needs):
 * 1. Header region — pack `HeaderLink` / compact overlays via `blocks`
 * 2. Main region — scroll + `Shell` (sync block overlays for search/promo/logo)
 * 3. Footer region — pack `FooterLink`
 */
function CompactStrategyComponent({ layout, config }: SidebarTypeStrategyProps) {
  const { regions, scrollArea } = config;
  // Omit Mantine `scrollbarSize` — size comes from `.scroll` CSS tokens.
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
          className={styles.scroll}
          h="100%"
          scrollbars="y"
          {...scrollAreaProps}
          classNames={{
            viewport: styles.viewport,
            content: styles.scrollContent,
            scrollbar: styles.scrollbar,
            thumb: styles.thumb,
          }}
        >
          <Shell menu={layout.mainMenu} />
        </ScrollArea>
      )}

      {showFooter && <SidebarFooter section={layout.footerSection!} />}
    </>
  );
}

export const CompactStrategy = memo(CompactStrategyComponent);
CompactStrategy.displayName = 'SidebarCompactTypeStrategy';
