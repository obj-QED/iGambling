import type { SectionProps } from '../types';

import { Children, memo } from 'react';

import clsx from 'clsx';

import { filterRenderableItems } from '../lib';
import { Block } from './Block';

import styles from '../styles/base/Section.module.scss';

function SectionComponent({ section, children, className }: SectionProps) {
  if (Children.count(children) > 0) {
    const label = section?.key ?? 'section';
    return (
      <nav
        className={clsx(styles.root, className)}
        aria-label={label}
        data-section-key={section?.key}
      >
        <ul className={styles.list}>{children}</ul>
      </nav>
    );
  }

  if (!section) return null;

  const items = filterRenderableItems(section.items);
  if (items.length === 0) return null;

  return (
    <nav
      className={clsx(styles.root, className)}
      aria-label={section.key}
      data-section-key={section.key}
    >
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.key} className={styles.item}>
            <Block item={item} className={styles.itemContent} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const Section = memo(SectionComponent);
Section.displayName = 'SidebarSection';
