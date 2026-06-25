import type { HeaderLayoutKey } from '../types';
import type { ComponentType } from 'react';

import { ContainerFluidLayout } from '../ui/layouts/ContainerFluidLayout/ContainerFluidLayout';
import { ContainerLayout } from '../ui/layouts/ContainerLayout/ContainerLayout';

export const LAYOUT_REGISTRY: Record<
  HeaderLayoutKey,
  ComponentType<{ children: React.ReactNode }>
> = {
  container: ContainerLayout,
  'container-fluid': ContainerFluidLayout,
};
