import type { SidebarTypeStrategyProps } from '../../types';

import { memo } from 'react';

import { ScrollArea } from '@mantine/core';

import { filterRenderableItems } from '../../lib';
import { Block } from '../../ui/Block';
import { SidebarFooter } from '../../ui/layout/SidebarFooter/SidebarFooter';
import { SidebarHeader } from '../../ui/layout/SidebarHeader/SidebarHeader';
import { Section } from '../../ui/Section';
import { Shell } from '../../ui/Shell';
import { renderChromeItems } from '../renderChromeItems';
import { useSidebarTypePack } from '../useSidebarTypePack';

import scrollAreaStyles from '../../styles/base/AsideScrollArea.module.scss';
import styles from '../../styles/base/Root.module.scss';
import sectionStyles from '../../styles/base/Section.module.scss';

/** Default type — owns full chrome tree (duplicate OK vs compact). */
function DefaultStrategyComponent({ layout, config }: SidebarTypeStrategyProps) {
  const { regions, scrollArea } = config;
  const { HeaderLink, FooterLink } = useSidebarTypePack();
  const HeaderItem = HeaderLink ?? Block;
  const FooterItem = FooterLink ?? Block;

  const headerItems = layout.headerSection ? filterRenderableItems(layout.headerSection.items) : [];
  const footerItems = layout.footerSection ? filterRenderableItems(layout.footerSection.items) : [];
  const mainSections = layout.mainMenu.sections.filter(
    (section) => filterRenderableItems(section.items).length > 0,
  );

  return (
    <>
      {regions.header && layout.headerSection && headerItems.length > 0 ? (
        <SidebarHeader>{renderChromeItems(headerItems, HeaderItem)}</SidebarHeader>
      ) : null}

      {regions.main && mainSections.length > 0 ? (
        <ScrollArea
          className={styles.scroll}
          classNames={{
            content: styles.scrollContent,
            scrollbar: scrollAreaStyles.scrollbar,
            thumb: scrollAreaStyles.thumb,
          }}
          h="100%"
          scrollbars="y"
          {...scrollArea}
        >
          <Shell>
            {mainSections.map((section) => {
              const items = filterRenderableItems(section.items);
              return (
                <Section key={section.key} section={section}>
                  {items.map((item) => (
                    <li key={item.key} className={sectionStyles.item}>
                      <Block item={item} className={sectionStyles.itemContent} />
                    </li>
                  ))}
                </Section>
              );
            })}
          </Shell>
        </ScrollArea>
      ) : null}

      {regions.footer && layout.footerSection && footerItems.length > 0 ? (
        <SidebarFooter>{renderChromeItems(footerItems, FooterItem)}</SidebarFooter>
      ) : null}
    </>
  );
}

export const DefaultStrategy = memo(DefaultStrategyComponent);
DefaultStrategy.displayName = 'SidebarDefaultTypeStrategy';
