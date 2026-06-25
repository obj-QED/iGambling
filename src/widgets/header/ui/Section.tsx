import type { SectionProps } from '../types';

import { memo } from 'react';

import { Group } from '@mantine/core';

import { filterRenderableItems } from '../lib/itemUtils';
import { Block } from './Block';

import styles from '../styles/base/Section.module.scss';

function SectionComponent({ section }: SectionProps) {
  const items = filterRenderableItems(section.items);
  if (items.length === 0) return null;

  return (
    <Group className={styles.root} gap="sm" wrap="nowrap" data-section-key={section.key}>
      {items.map((item) => (
        <Block key={item.key} item={item} />
      ))}
    </Group>
  );
}

export const Section = memo(SectionComponent);
Section.displayName = 'Section';
