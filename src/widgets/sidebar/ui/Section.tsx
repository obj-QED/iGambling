import type { SectionProps } from '../types';

import { memo } from 'react';

import { filterRenderableItems } from '../lib/itemUtils';
import { Block } from './Block';

import styles from '../styles/base/Section.module.scss';

function SectionComponent({ section }: SectionProps) {
  const items = filterRenderableItems(section.items);
  if (items.length === 0) return null;

  return (
    <nav className={styles.root} aria-label={section.key} data-section-key={section.key}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.key} className={styles.item}>
            <Block item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const Section = memo(SectionComponent);
Section.displayName = 'SidebarSection';
