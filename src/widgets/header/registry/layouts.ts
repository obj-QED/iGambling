import type { HeaderLayoutStrategyKey } from '@/shared/config';
import type { ComponentType, ReactNode } from 'react';

import { ContainerFluidLayout } from '../ui/layouts/ContainerFluidLayout/ContainerFluidLayout';
import { ContainerLayout } from '../ui/layouts/ContainerLayout/ContainerLayout';

type LayoutComponent = ComponentType<{ children: ReactNode }>;

export const LAYOUT_REGISTRY: Record<HeaderLayoutStrategyKey, LayoutComponent> = {
  container: ContainerLayout,
  'container-fluid': ContainerFluidLayout,
};

/** Unknown layout string → `container`. */
export function resolveHeaderLayout(layout: string): LayoutComponent {
  if (Object.hasOwn(LAYOUT_REGISTRY, layout)) {
    return LAYOUT_REGISTRY[layout as HeaderLayoutStrategyKey];
  }
  return LAYOUT_REGISTRY.container;
}
