import type { SectionProps } from '../../../types';

import { memo } from 'react';

import { filterRenderableItems, isSpecialBlockKey } from '../../../lib';
import { Block } from '../../Block';
import { useSidebarTypePack } from '../../type';
import { SidebarHeaderLink } from './HeaderLink';

import styles from '../../../styles/blocks/SidebarHeader.module.scss';

function SidebarHeaderComponent({ section }: SectionProps) {
  const { HeaderLink } = useSidebarTypePack();
  const PackLink = HeaderLink ?? SidebarHeaderLink;
  const items = filterRenderableItems(section.items);
  if (items.length === 0) return null;

  return (
    <div className={styles.root} data-sidebar-region="header">
      {items.map((item) => {
        const Item = isSpecialBlockKey(item.key) ? Block : PackLink;
        return <Item key={item.key ?? item.name} item={item} />;
      })}
    </div>
  );
}

export { SidebarHeaderLink } from './HeaderLink';
export const SidebarHeader = memo(SidebarHeaderComponent);
SidebarHeader.displayName = 'SidebarHeader';
