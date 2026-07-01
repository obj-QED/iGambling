import type { ContainerFluidLayoutProps } from '../../../types';

import { memo } from 'react';

import { Container } from '@mantine/core';

import styles from '../../../styles/layout/ContainerFluidLayout.module.scss';

function ContainerFluidLayoutComponent({ children }: ContainerFluidLayoutProps) {
  return (
    <Container className={styles.root} fluid>
      {children}
    </Container>
  );
}

export const ContainerFluidLayout = memo(ContainerFluidLayoutComponent);
ContainerFluidLayout.displayName = 'ContainerFluidLayout';
