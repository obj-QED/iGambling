import type { AppHeaderLayoutProps } from '../../types/AppHeader.types';

import { memo } from 'react';

import { joinClassNames } from '@/shared/lib';

import styles from '../../styles/layout/AppHeaderContainer.module.scss';

function AppHeaderContainerLayoutComponent({ children }: AppHeaderLayoutProps) {
  return <div className={joinClassNames('header-container', styles.root)}>{children}</div>;
}

export const AppHeaderContainerLayout = memo(AppHeaderContainerLayoutComponent);
AppHeaderContainerLayout.displayName = 'AppHeaderContainerLayout';
