import type { SectionProps } from '../../../types';

import { memo } from 'react';

import { filterRenderableItems } from '../../../lib';
import { useSidebarTypePack } from '../../../typePacks';
import { SidebarHeaderLink } from '../SidebarHeaderLink/SidebarHeaderLink';

import styles from '../../../styles/layout/SidebarHeader.module.scss';

function SidebarHeaderComponent({ section, children }: SectionProps) {
  const { HeaderLink } = useSidebarTypePack();

  if (children) {
    return (
      <div className={styles.root} data-sidebar-region="header">
        {children}
      </div>
    );
  }

  if (!section) return null;

  const Link = HeaderLink ?? SidebarHeaderLink;
  const items = filterRenderableItems(section.items);
  if (items.length === 0) return null;

  return (
    <div className={styles.root} data-sidebar-region="header">
      {items.map((item) => (
        <Link key={item.key ?? item.name} item={item} />
      ))}
    </div>
  );
}

export const SidebarHeader = memo(SidebarHeaderComponent);
SidebarHeader.displayName = 'SidebarHeader';
