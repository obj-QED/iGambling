import type { ReactNode } from 'react';

import { memo, Suspense } from 'react';

import { Skeleton } from '@mantine/core';

type HeaderAdapterBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

function DefaultFallback() {
  return <Skeleton height={28} width={28} radius="sm" />;
}

function HeaderAdapterBoundaryComponent({ children, fallback }: HeaderAdapterBoundaryProps) {
  return <Suspense fallback={fallback ?? <DefaultFallback />}>{children}</Suspense>;
}

export const HeaderAdapterBoundary = memo(HeaderAdapterBoundaryComponent);
HeaderAdapterBoundary.displayName = 'HeaderAdapterBoundary';
