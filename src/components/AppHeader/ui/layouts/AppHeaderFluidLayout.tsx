import type { AppHeaderLayoutProps } from '../../types/AppHeader.types';

import { memo } from 'react';

import { joinClassNames } from '@/shared/lib';

import styles from '../../styles/layout/AppHeaderFluid.module.scss';

function AppHeaderFluidLayoutComponent({ children }: AppHeaderLayoutProps) {
  return <div className={joinClassNames('header', 'container-fluid', styles.root)}>{children}</div>;
}

export const AppHeaderFluidLayout = memo(AppHeaderFluidLayoutComponent);
AppHeaderFluidLayout.displayName = 'AppHeaderFluidLayout';
