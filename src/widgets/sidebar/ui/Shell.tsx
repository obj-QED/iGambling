import type { ShellProps } from '../types';

import { memo } from 'react';

import clsx from 'clsx';

import { Section } from './Section';

import styles from '../styles/base/Shell.module.scss';

function ShellComponent({ menu, children, className }: ShellProps) {
  if (children) {
    return <div className={clsx(styles.root, className)}>{children}</div>;
  }

  if (!menu) return null;

  const sections = menu.sections.filter((section) => section.items.length > 0);
  if (sections.length === 0) return null;

  return (
    <div className={clsx(styles.root, className)}>
      {sections.map((section) => (
        <Section key={section.key} section={section} />
      ))}
    </div>
  );
}

export const Shell = memo(ShellComponent);
Shell.displayName = 'SidebarShell';
