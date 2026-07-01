import type { ShellProps } from '../types';

import { memo } from 'react';

import { Section } from './Section';

import styles from '../styles/base/Shell.module.scss';

function ShellComponent({ menu }: ShellProps) {
  const sections = menu.sections.filter((section) => section.items.length > 0);

  if (sections.length === 0) return null;

  return (
    <div className={styles.root}>
      {sections.map((section) => (
        <Section key={section.key} section={section} />
      ))}
    </div>
  );
}

export const Shell = memo(ShellComponent);
Shell.displayName = 'SidebarShell';
