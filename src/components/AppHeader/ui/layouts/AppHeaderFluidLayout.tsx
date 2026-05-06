import type { AppHeaderLayoutProps } from '../../types/AppHeader.types';

import { memo } from 'react';

import { Container } from '@mantine/core';

import { joinClassNames } from '@/shared/lib';

import styles from '../../styles/layout/AppHeaderFluid.module.scss';

function AppHeaderFluidLayoutComponent({ children }: AppHeaderLayoutProps) {
  return <Container fluid className={joinClassNames('header', 'container-fluid', styles.root)}>{children}</Container>;
}

export const AppHeaderFluidLayout = memo(AppHeaderFluidLayoutComponent);
AppHeaderFluidLayout.displayName = 'AppHeaderFluidLayout';
