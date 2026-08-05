import type { SectionProps } from '../../../types';

import { memo } from 'react';

import { filterRenderableItems, isSpecialBlockKey } from '../../../lib';
import { Block } from '../../Block';
import { useSidebarTypePack } from '../../type';
import { SidebarFooterLink } from './FooterLink';

import styles from '../../../styles/blocks/SidebarFooter.module.scss';

function SidebarFooterComponent({ section }: SectionProps) {
  const { FooterLink } = useSidebarTypePack();
  const PackLink = FooterLink ?? SidebarFooterLink;
  const items = filterRenderableItems(section.items);
  if (items.length === 0) return null;

  return (
    <div className={styles.root} data-sidebar-region="footer">
      {items.map((item) => {
        const Item = isSpecialBlockKey(item.key) ? Block : PackLink;
        return <Item key={item.key ?? item.name} item={item} />;
      })}
    </div>
  );
}

export { SidebarFooterLink } from './FooterLink';
export const SidebarFooter = memo(SidebarFooterComponent);
SidebarFooter.displayName = 'SidebarFooter';
