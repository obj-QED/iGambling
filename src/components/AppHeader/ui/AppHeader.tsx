import type {
  AppHeaderLayout,
  AppHeaderProps,
  AppHeaderResolvedSlotProps,
  AppHeaderSectionSlot,
  AppHeaderSlotCount,
  AppHeaderVariant,
} from '../types/AppHeader.types';
import type { ReactNode } from 'react';
import type { ComponentType } from 'react';

import { memo, useMemo } from 'react';

import { useAppHeaderState } from '../hooks/useAppHeaderState';
import { AppHeaderContainerLayout } from './layouts/AppHeaderContainerLayout';
import { AppHeaderFluidLayout } from './layouts/AppHeaderFluidLayout';
import { AppHeaderClassicContainerSkeleton } from './skeletons/classic/AppHeaderClassicContainerSkeleton';
import { AppHeaderClassicFluidSkeleton } from './skeletons/classic/AppHeaderClassicFluidSkeleton';
import { AppHeaderDefaultContainerSkeleton } from './skeletons/default/AppHeaderDefaultContainerSkeleton';
import { AppHeaderDefaultFluidSkeleton } from './skeletons/default/AppHeaderDefaultFluidSkeleton';
import { AppHeaderClassicView } from './variants/classic/AppHeaderClassicView';
import { AppHeaderDefaultView } from './variants/default/AppHeaderDefaultView';

import baseStyles from '../styles/base/AppHeaderBase.module.scss';

function resolveSlot(slot: AppHeaderSectionSlot | undefined, fallback: ReactNode, isAuthenticated: boolean, loading: boolean): ReactNode {
  if (typeof slot === 'function') {
    return slot({ isAuthenticated, loading });
  }
  return slot ?? fallback;
}

function resolveSlots(
  sections: AppHeaderSectionSlot[] | undefined,
  leftFallback: ReactNode,
  centerFallback: ReactNode,
  rightFallback: ReactNode,
  isAuthenticated: boolean,
  loading: boolean,
): { slotCount: AppHeaderSlotCount; leftSlot: ReactNode; centerSlot: ReactNode | null; rightSlot: ReactNode | null } {
  const len = sections?.length ?? 0;
  if (len === 0) {
    return {
      slotCount: 3,
      leftSlot: resolveSlot(undefined, leftFallback, isAuthenticated, loading),
      centerSlot: resolveSlot(undefined, centerFallback, isAuthenticated, loading),
      rightSlot: resolveSlot(undefined, rightFallback, isAuthenticated, loading),
    };
  }
  if (len === 1) {
    return {
      slotCount: 1,
      leftSlot: resolveSlot(sections![0], leftFallback, isAuthenticated, loading),
      centerSlot: null,
      rightSlot: null,
    };
  }
  if (len === 2) {
    return {
      slotCount: 2,
      leftSlot: resolveSlot(sections![0], leftFallback, isAuthenticated, loading),
      centerSlot: resolveSlot(sections![1], centerFallback, isAuthenticated, loading),
      rightSlot: null,
    };
  }
  return {
    slotCount: 3,
    leftSlot: resolveSlot(sections![0], leftFallback, isAuthenticated, loading),
    centerSlot: resolveSlot(sections![1], centerFallback, isAuthenticated, loading),
    rightSlot: resolveSlot(sections![2], rightFallback, isAuthenticated, loading),
  };
}

const LAYOUT_COMPONENTS: Record<AppHeaderLayout, ComponentType<{ children: ReactNode }>> = {
  container: AppHeaderContainerLayout,
  'container-fluid': AppHeaderFluidLayout,
};

const VARIANT_COMPONENTS: Record<
  AppHeaderVariant,
  ComponentType<AppHeaderResolvedSlotProps & { LayoutComponent: ComponentType<{ children: ReactNode }> }>
> = {
  default: AppHeaderDefaultView,
  classic: AppHeaderClassicView,
};

const DEFAULT_HEADER_LAYOUT: AppHeaderLayout = 'container';
const DEFAULT_HEADER_TYPE: AppHeaderVariant = 'default';

function resolveSettingsHeader(): { layout: AppHeaderLayout; type: AppHeaderVariant } {
  const fallback = {
    layout: DEFAULT_HEADER_LAYOUT,
    type: DEFAULT_HEADER_TYPE,
  };
  if (typeof globalThis === 'undefined') return fallback;
  const settings = (globalThis as { __SETTINGS__?: Record<string, unknown> }).__SETTINGS__;
  if (!settings || typeof settings !== 'object') return fallback;
  const header = (settings as { header?: unknown }).header;
  if (!header || typeof header !== 'object') return fallback;

  const maybeLayout = (header as { layout?: unknown }).layout;
  const maybeType = (header as { type?: unknown }).type;
  const layout = maybeLayout === 'container-fluid' ? 'container-fluid' : 'container';
  const type = maybeType === 'classic' ? 'classic' : 'default';

  return { layout, type };
}

const SKELETON_COMPONENTS: Record<
  AppHeaderLayout,
  Record<AppHeaderVariant, ComponentType<{ sectionCount: number }>>
> = {
  container: {
    default: AppHeaderDefaultContainerSkeleton,
    classic: AppHeaderClassicContainerSkeleton,
  },
  'container-fluid': {
    default: AppHeaderDefaultFluidSkeleton,
    classic: AppHeaderClassicFluidSkeleton,
  },
};

function AppHeaderComponent({ layout, variant, sections }: AppHeaderProps) {
  const { loading, isAuthenticated, title, logoUrl, providers } = useAppHeaderState();
  const settingsHeader = useMemo(() => resolveSettingsHeader(), []);
  const resolvedLayout = layout ?? settingsHeader.layout;
  const resolvedVariant = variant ?? settingsHeader.type;
  const LayoutComponent = LAYOUT_COMPONENTS[resolvedLayout];
  const VariantComponent = VARIANT_COMPONENTS[resolvedVariant];
  const SkeletonComponent = SKELETON_COMPONENTS[resolvedLayout][resolvedVariant];

  const leftFallback = useMemo(() => <span>{isAuthenticated ? 'Account' : 'Guest'}</span>, [isAuthenticated]);
  const centerFallback = useMemo(
    () => (
      <h1 className={`${baseStyles.root__title} ${loading ? baseStyles['root__title--hidden'] : ''}`} data-testid='app-header-title'>
        {title}
      </h1>
    ),
    [loading, title],
  );
  const rightFallback = useMemo(() => <span>{isAuthenticated ? 'Logout' : 'Login'}</span>, [isAuthenticated]);

  const hasSectionOverrides = Boolean(sections?.length);

  const { slotCount, leftSlot, centerSlot, rightSlot } = useMemo(
    () => resolveSlots(sections, leftFallback, centerFallback, rightFallback, isAuthenticated, loading),
    [sections, leftFallback, centerFallback, rightFallback, isAuthenticated, loading],
  );

  return (
    <VariantComponent
      baseStyles={baseStyles}
      loading={loading}
      title={title}
      logoUrl={logoUrl}
      providers={providers}
      isAuthenticated={isAuthenticated}
      hasSectionOverrides={hasSectionOverrides}
      slotCount={slotCount}
      leftSlot={leftSlot}
      centerSlot={centerSlot}
      rightSlot={rightSlot}
      SkeletonComponent={SkeletonComponent}
      LayoutComponent={LayoutComponent}
    />
  );
}

export const AppHeader = memo(AppHeaderComponent);
AppHeader.displayName = 'AppHeader';
