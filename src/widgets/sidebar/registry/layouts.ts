import type { SidebarLayoutProps } from '../types';
import type { AsideLayoutStrategyKey } from '@/shared/config';
import type { ComponentType } from 'react';

import { ContainerFluidLayout } from '../ui/layouts/ContainerFluidLayout/ContainerFluidLayout';
import { ContainerLayout } from '../ui/layouts/ContainerLayout/ContainerLayout';
import { DefaultLayout } from '../ui/layouts/DefaultLayout/DefaultLayout';

type LayoutComponent = ComponentType<SidebarLayoutProps>;

export const LAYOUT_REGISTRY: Record<AsideLayoutStrategyKey, LayoutComponent> = {
  container: ContainerLayout,
  'container-fluid': ContainerFluidLayout,
};

/** Known keys → registry; any other `layout` string → DefaultLayout. */
export function resolveSidebarLayout(layout: string): LayoutComponent {
  if (Object.hasOwn(LAYOUT_REGISTRY, layout)) {
    return LAYOUT_REGISTRY[layout as AsideLayoutStrategyKey];
  }
  return DefaultLayout;
}
