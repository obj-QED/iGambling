import type { AppFooterProps } from '../types';

import { memo } from 'react';

import clsx from 'clsx';

import { isCapabilityEnabled } from '@/shared/schema';

import styles from './AppFooter.module.scss';

function AppFooterComponent({ menu, schema, className }: AppFooterProps) {
  if (!isCapabilityEnabled(schema.capabilities, 'footer')) return null;
  if (menu.sections.length === 0) return null;

  return (
    <footer
      className={clsx(styles.root, className)}
      data-widget="footer"
      data-layout={schema.layout}
      data-variant={schema.variant}
    >
      {/* Footer content renders here in Phase 2+ */}
    </footer>
  );
}

export const AppFooter = memo(AppFooterComponent);
AppFooter.displayName = 'AppFooter';
