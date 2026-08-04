import type { SectionProps } from '../../../types';

import { Children, memo } from 'react';

import { filterRenderableItems } from '../../../lib';
import { useSidebarTypePack } from '../../../typePacks';
import { SidebarFooterLink } from '../SidebarFooterLink/SidebarFooterLink';

import styles from '../../../styles/layout/SidebarFooter.module.scss';

function SidebarFooterComponent({ section, children }: SectionProps) {
  const { FooterLink } = useSidebarTypePack();

  if (Children.count(children) > 0) {
    return (
      <div className={styles.root} data-sidebar-region="footer">
        {children}
      </div>
    );
  }

  if (!section) return null;

  const Link = FooterLink ?? SidebarFooterLink;
  const items = filterRenderableItems(section.items);
  if (items.length === 0) return null;

  return (
    <div className={styles.root} data-sidebar-region="footer">
      {items.map((item) => (
        <Link key={item.key ?? item.name} item={item} />
      ))}
    </div>
  );
}

export const SidebarFooter = memo(SidebarFooterComponent);
SidebarFooter.displayName = 'SidebarFooter';
