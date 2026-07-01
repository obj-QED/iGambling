import type { SectionProps } from '../../../types';

import { memo } from 'react';

import { filterRenderableItems } from '../../../lib/itemUtils';
import { SidebarHeaderLink } from '../SidebarHeaderLink/SidebarHeaderLink';

import styles from '../../../styles/layout/SidebarHeader.module.scss';

function SidebarHeaderComponent({ section }: SectionProps) {
  const items = filterRenderableItems(section.items);
  if (items.length === 0) return null;

  return (
    <div className={styles.root} data-sidebar-region="header">
      {items.map((item) => (
        <SidebarHeaderLink key={item.key ?? item.name} item={item} />
      ))}
    </div>
  );
}

export const SidebarHeader = memo(SidebarHeaderComponent);
SidebarHeader.displayName = 'SidebarHeader';
