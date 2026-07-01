import type { ContainerLayoutProps } from '../../../types';

import { memo } from 'react';

import { Container } from '@mantine/core';

import styles from '../../../styles/layout/ContainerLayout.module.scss';

function ContainerLayoutComponent({ children }: ContainerLayoutProps) {
  return (
    <Container className={styles.root} size="responsive">
      {children}
    </Container>
  );
}

export const ContainerLayout = memo(ContainerLayoutComponent);
ContainerLayout.displayName = 'ContainerLayout';
