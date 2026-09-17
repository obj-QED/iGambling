import type { SidebarTypeStrategyProps } from '../../../types';

import { memo } from 'react';

import { ScrollArea } from '@mantine/core';

import { hasRenderableMenuSections } from '../../../lib';
import { SidebarFooter } from '../../blocks/SidebarFooter/SidebarFooter';
import { SidebarHeader } from '../../blocks/SidebarHeader/SidebarHeader';
import { Shell } from '../../Shell';

import styles from '../../../styles/base/Root.module.scss';

/**
 * Slidein — default row chrome that morphs into a compact rail.
 * Labels slide left behind the clip while aside width tweens to compact width.
 */
function SlideinStrategyComponent({ layout, config }: SidebarTypeStrategyProps) {
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
          className={styles.scroll}
          h="100%"
          scrollbars="y"
          {...scrollAreaProps}
          classNames={{
            viewport: styles.viewport,
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

export const SlideinStrategy = memo(SlideinStrategyComponent);
SlideinStrategy.displayName = 'SidebarSlideinTypeStrategy';
