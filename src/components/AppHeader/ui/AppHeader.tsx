import type {
  AppHeaderLayout,
  AppHeaderMenuItem,
  AppHeaderVariant,
  AppHeaderViewProps,
} from '@AppHeader/types/AppHeader.types';
import type { ReactNode } from 'react';
import type { ComponentType } from 'react';

import { memo } from 'react';

import { useAppHeaderState } from '@AppHeader/hooks/useAppHeaderState';
import { AppHeaderContainerLayout } from '@AppHeader/ui/layouts/AppHeaderContainerLayout';
import { AppHeaderFluidLayout } from '@AppHeader/ui/layouts/AppHeaderFluidLayout';
import { AppHeaderClassicSkeleton } from '@AppHeader/ui/skeletons/AppHeaderClassicSkeleton';
import { AppHeaderDefaultSkeleton } from '@AppHeader/ui/skeletons/AppHeaderDefaultSkeleton';
import { AppHeaderClassicView } from '@AppHeader/ui/variants/classic/AppHeaderClassicView';
import { AppHeaderDefaultView } from '@AppHeader/ui/variants/default/AppHeaderDefaultView';

const LAYOUT_COMPONENTS: Record<AppHeaderLayout, ComponentType<{ children: ReactNode }>> = {
  container: AppHeaderContainerLayout,
  'container-fluid': AppHeaderFluidLayout,
};

const VARIANT_COMPONENTS: Record<AppHeaderVariant, ComponentType<AppHeaderViewProps>> = {
  default: AppHeaderDefaultView,
  classic: AppHeaderClassicView,
};

type AppHeaderSkeletonProps = {
  menu?: AppHeaderMenuItem[];
};

const SKELETON_COMPONENTS: Record<AppHeaderVariant, ComponentType<AppHeaderSkeletonProps>> = {
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
