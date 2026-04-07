import type { AppHeaderLayoutProps } from '../../types/AppHeader.types';

import styles from '../../styles/layout/AppHeaderContainer.module.scss';

export function AppHeaderContainerLayout({ children }: AppHeaderLayoutProps) {
  return <div className={`header-container ${styles.root}`}>{children}</div>;
}

AppHeaderContainerLayout.displayName = 'AppHeaderContainerLayout';
