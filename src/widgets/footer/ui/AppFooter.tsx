import type { AppFooterProps } from '../types';

import { memo } from 'react';

import clsx from 'clsx';

import styles from './AppFooter.module.scss';

function AppFooterComponent({ menu, className }: AppFooterProps) {
  if (menu.sections.length === 0) return null;

  return (
    <footer className={clsx(styles.root, className)} data-widget="footer">
      {/* Footer content renders here in Phase 2+ */}
    </footer>
  );
}

export const AppFooter = memo(AppFooterComponent);
AppFooter.displayName = 'AppFooter';
