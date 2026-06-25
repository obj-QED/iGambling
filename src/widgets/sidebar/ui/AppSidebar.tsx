import type { AppSidebarProps } from '../types';

import { memo } from 'react';

import clsx from 'clsx';

import styles from './AppSidebar.module.scss';

function AppSidebarComponent({ menu, className }: AppSidebarProps) {
  if (menu.sections.every((section) => section.items.length === 0)) return null;

  return (
    <aside className={clsx(styles.root, className)} data-widget="sidebar" aria-label="Sidebar menu">
      {/* Sidebar content renders here in Phase 2+ */}
    </aside>
  );
}

export const AppSidebar = memo(AppSidebarComponent);
AppSidebar.displayName = 'AppSidebar';
