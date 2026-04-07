import type { AppHeaderLayoutProps } from '../../types/AppHeader.types';

import styles from '../../styles/layout/AppHeaderFluid.module.scss';

export function AppHeaderFluidLayout({ children }: AppHeaderLayoutProps) {
  return <div className={`header container-fluid ${styles.root}`}>{children}</div>;
}

AppHeaderFluidLayout.displayName = 'AppHeaderFluidLayout';
