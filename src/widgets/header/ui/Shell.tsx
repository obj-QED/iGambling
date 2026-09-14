import type { ShellProps } from '../types';

import { memo } from 'react';

import { Group } from '@mantine/core';

import { isNonEmptyArray, LazyHost } from '@/shared/lib';

import { resolveHeaderLayout } from '../registry';
import { Section } from './Section';

import styles from '../styles/base/Shell.module.scss';

function ShellComponent({ menu, config }: ShellProps) {
  const sections = menu.sections.filter((section) => isNonEmptyArray(section.items));

  if (sections.length === 0) return null;

  return (
    <LazyHost component={resolveHeaderLayout(config.layout)}>
      <Group className={styles.sections} data-header-sections unstyled>
        {sections.map((section) => (
          <Section key={section.key} section={section} />
        ))}
      </Group>
    </LazyHost>
  );
}

export const Shell = memo(ShellComponent);
Shell.displayName = 'Shell';
