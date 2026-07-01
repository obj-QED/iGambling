import type { SectionProps } from '../../../types';

import { memo } from 'react';

import { filterRenderableItems } from '../../../lib/itemUtils';
import { SidebarFooterLink } from '../SidebarFooterLink/SidebarFooterLink';

import styles from '../../../styles/layout/SidebarFooter.module.scss';

function SidebarFooterComponent({ section }: SectionProps) {
  const items = filterRenderableItems(section.items);
  if (items.length === 0) return null;

  return (
    <div className={styles.root} data-sidebar-region="footer">
      {items.map((item) => (
        <SidebarFooterLink key={item.key ?? item.name} item={item} />
      ))}
    </div>
  );
}

export const SidebarFooter = memo(SidebarFooterComponent);
SidebarFooter.displayName = 'SidebarFooter';
