import type { RootProps } from '../types';

import { memo } from 'react';

import { Group } from '@mantine/core';

import { LAYOUT_REGISTRY } from '../registry/layouts';
import { Section } from './Section';

import styles from '../styles/base/Shell.module.scss';

type ShellProps = Pick<RootProps, 'menu' | 'config'>;

function ShellComponent({ menu, config }: ShellProps) {
  const Layout = LAYOUT_REGISTRY[config.layout];
  const sections = menu.sections.filter((section) => section.items.length > 0);

  if (sections.length === 0) return null;

  return (
    <Layout>
      <Group className={styles.sections} justify="space-between" wrap="nowrap" gap="md">
        {sections.map((section) => (
          <Section key={section.key} section={section} />
        ))}
      </Group>
    </Layout>
  );
}

export const Shell = memo(ShellComponent);
Shell.displayName = 'Shell';
