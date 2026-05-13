import type { AppHeaderLayoutProps } from '@AppHeader/types/AppHeader.types';

import { memo } from 'react';

import { Container } from '@mantine/core';

import { joinClassNames } from '@shared/lib';

import styles from '@AppHeader/styles/layout/AppHeaderContainer.module.scss';

function AppHeaderContainerLayoutComponent({ children }: AppHeaderLayoutProps) {
  return <Container size="responsive" className={joinClassNames('header-container', styles.root)}>{children}</Container>;
}

export const AppHeaderContainerLayout = memo(AppHeaderContainerLayoutComponent);
AppHeaderContainerLayout.displayName = 'AppHeaderContainerLayout';
