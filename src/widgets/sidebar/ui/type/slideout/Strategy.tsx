import type { SidebarTypeStrategyProps } from '../../../types';

import { memo } from 'react';

import { ScrollArea } from '@mantine/core';

import { hasRenderableMenuSections } from '../../../lib';
import { SidebarFooter } from '../../blocks/SidebarFooter/SidebarFooter';
import { SidebarHeader } from '../../blocks/SidebarHeader/SidebarHeader';
import { Shell } from '../../Shell';

import styles from '../../../styles/base/Root.module.scss';

/**
 * Slideout type chrome — collapsed icon rail that expands on hover/focus-within.
 * Row buttons keep labels in the DOM; CSS clips them while the shell width animates.
 */
function SlideoutStrategyComponent({ layout, config }: SidebarTypeStrategyProps) {
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

export const SlideoutStrategy = memo(SlideoutStrategyComponent);
SlideoutStrategy.displayName = 'SidebarSlideoutTypeStrategy';
