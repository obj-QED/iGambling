import type { ShellProps } from '../types';

import { memo } from 'react';

import { Group } from '@mantine/core';

import { resolveHeaderLayout } from '../registry';
import { Section } from './Section';

import styles from '../styles/base/Shell.module.scss';

function ShellComponent({ menu, config }: ShellProps) {
  const Layout = resolveHeaderLayout(config.layout);
  const sections = menu.sections.filter((section) => section.items.length > 0);

  if (sections.length === 0) return null;

  return (
    <Layout>
      <Group className={styles.sections} data-header-sections unstyled>
        {sections.map((section) => (
          <Section key={section.key} section={section} />
        ))}
      </Group>
    </Layout>
  );
}

export const Shell = memo(ShellComponent);
Shell.displayName = 'Shell';
