import type { AppHeaderLayout, AppHeaderVariant, AppHeaderViewProps } from '../types/AppHeader.types';
import type { ReactNode } from 'react';
import type { ComponentType } from 'react';

import { memo } from 'react';

import { useAppHeaderState } from '../hooks/useAppHeaderState';
import { AppHeaderContainerLayout } from './layouts/AppHeaderContainerLayout';
import { AppHeaderFluidLayout } from './layouts/AppHeaderFluidLayout';
import { AppHeaderClassicSkeleton } from './skeletons/AppHeaderClassicSkeleton';
import { AppHeaderDefaultSkeleton } from './skeletons/AppHeaderDefaultSkeleton';
import { AppHeaderClassicView } from './variants/classic/AppHeaderClassicView';
import { AppHeaderDefaultView } from './variants/default/AppHeaderDefaultView';

const LAYOUT_COMPONENTS: Record<AppHeaderLayout, ComponentType<{ children: ReactNode }>> = {
  container: AppHeaderContainerLayout,
  'container-fluid': AppHeaderFluidLayout,
};

const VARIANT_COMPONENTS: Record<AppHeaderVariant, ComponentType<AppHeaderViewProps>> = {
  default: AppHeaderDefaultView,
  classic: AppHeaderClassicView,
};

const SKELETON_COMPONENTS: Record<AppHeaderVariant, ComponentType> = {
  default: AppHeaderDefaultSkeleton,
  classic: AppHeaderClassicSkeleton,
};

function AppHeaderComponent() {
  const { params, data, loading, error, isAuthenticated } = useAppHeaderState();
  const VariantComponent = VARIANT_COMPONENTS[params.variant];

  return (
    <VariantComponent
      params={params}
      data={data}
      loading={loading}
      error={error}
      isAuthenticated={isAuthenticated}
    />
  );
}

export const AppHeader = memo(AppHeaderComponent);
AppHeader.displayName = 'AppHeader';

export { LAYOUT_COMPONENTS, SKELETON_COMPONENTS };
