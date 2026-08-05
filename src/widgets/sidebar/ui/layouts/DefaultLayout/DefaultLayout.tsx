import type { DefaultLayoutProps } from '../../../types';

import { memo } from 'react';

import clsx from 'clsx';

import styles from '../../../styles/layout/DefaultLayout.module.scss';

/** Fallback shell for any `layout` not in LAYOUT_REGISTRY (open settings string). */
function DefaultLayoutComponent({ children, layout }: DefaultLayoutProps) {
  return <div className={clsx(styles.root, layout)}>{children}</div>;
}

export const DefaultLayout = memo(DefaultLayoutComponent);
DefaultLayout.displayName = 'SidebarDefaultLayout';
