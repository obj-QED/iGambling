import type { ReactNode } from 'react';

import { memo, Suspense } from 'react';

import { Skeleton } from '@mantine/core';

type AdapterBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

function DefaultFallback() {
  return <Skeleton height={28} width={28} radius="sm" />;
}

function AdapterBoundaryComponent({ children, fallback }: AdapterBoundaryProps) {
  return <Suspense fallback={fallback ?? <DefaultFallback />}>{children}</Suspense>;
}

export const AdapterBoundary = memo(AdapterBoundaryComponent);
AdapterBoundary.displayName = 'AdapterBoundary';
