import type { SectionProps } from '../../../types';

import { memo } from 'react';

import { filterRenderableItems } from '../../../lib';
import { Block } from '../../Block';
import { useSidebarTypePack } from '../../type';
import { SidebarFooterLink } from './FooterLink';

import styles from '../../../styles/blocks/SidebarFooter.module.scss';

/**
 * Footer region — chrome links only.
 * Main-menu specials are not routed here (Section → Block owns them).
 */
function SidebarFooterComponent({ section }: SectionProps) {
  const { FooterLink } = useSidebarTypePack();
  const PackLink = FooterLink ?? SidebarFooterLink;
  const items = filterRenderableItems(section.items);
  if (items.length === 0) return null;

  return (
    <div className={styles.root} data-sidebar-region="footer">
      {items.map((item) => {
        const rowKey = item.key ?? item.name;

        if (item.items !== undefined && item.items.length > 0) {
          return <Block key={rowKey} item={item} />;
        }

        return <PackLink key={rowKey} item={item} />;
      })}
    </div>
  );
}

export { SidebarFooterLink } from './FooterLink';
export const SidebarFooter = memo(SidebarFooterComponent);
SidebarFooter.displayName = 'SidebarFooter';
