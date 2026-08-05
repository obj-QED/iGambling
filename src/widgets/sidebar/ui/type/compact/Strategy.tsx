import type { SidebarTypeStrategyProps } from '../../../types';

import { memo } from 'react';

import { ScrollArea } from '@mantine/core';

import { hasRenderableMenuSections } from '../../../lib';
import { SidebarFooter } from '../../blocks/SidebarFooter/SidebarFooter';
import { SidebarHeader } from '../../blocks/SidebarHeader/SidebarHeader';
import { Shell } from '../../Shell';

import scrollAreaStyles from '../../../styles/base/AsideScrollArea.module.scss';
import styles from '../../../styles/base/Root.module.scss';

/**
 * Compact type — owns full chrome tree (duplicate of default OK; reshape freely here).
 */
function CompactStrategyComponent({ layout, config }: SidebarTypeStrategyProps) {
  const { regions, scrollArea } = config;

  return (
    <>
      {regions.header && layout.headerSection && <SidebarHeader section={layout.headerSection} />}

      {regions.main && hasRenderableMenuSections(layout.mainMenu) && (
        <ScrollArea
          className={styles.scroll}
          classNames={{
            root: styles.scrollContent,
            scrollbar: scrollAreaStyles.scrollbar,
            thumb: scrollAreaStyles.thumb,
          }}
          h="100%"
          scrollbars="y"
          {...scrollArea}
        >
          <Shell menu={layout.mainMenu} />
        </ScrollArea>
      )}

      {regions.footer && layout.footerSection && <SidebarFooter section={layout.footerSection} />}
    </>
  );
}

export const CompactStrategy = memo(CompactStrategyComponent);
CompactStrategy.displayName = 'SidebarCompactTypeStrategy';
