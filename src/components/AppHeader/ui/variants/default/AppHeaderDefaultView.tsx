import type { AppHeaderResolvedSlotProps } from '../../../types/AppHeader.types';
import type { ComponentType, ReactNode } from 'react';

import { memo, useMemo } from 'react';

import { AppHeaderDefaultLayout } from '../../blocks/AppHeaderDefaultLayout/AppHeaderDefaultLayout';
import { AppHeaderGuestActions } from '../../blocks/AppHeaderGuestActions/AppHeaderGuestActions';
import { AppHeaderIdentity } from '../../blocks/AppHeaderIdentity/AppHeaderIdentity';
import { AppHeaderLogo } from '../../blocks/AppHeaderLogo/AppHeaderLogo';
import { AppHeaderPageTitle } from '../../blocks/AppHeaderPageTitle/AppHeaderPageTitle';
import { AppHeaderProvidersNav } from '../../blocks/AppHeaderProvidersNav/AppHeaderProvidersNav';
import { AppHeaderUserActions } from '../../blocks/AppHeaderUserActions/AppHeaderUserActions';

import defaultStyles from '../../../styles/variants/AppHeaderDefault.module.scss';
import layoutStyles from '../../blocks/AppHeaderDefaultLayout/AppHeaderDefaultLayout.module.scss';

type AppHeaderDefaultViewProps = AppHeaderResolvedSlotProps & {
  LayoutComponent: ComponentType<{ children: ReactNode }>;
};

function AppHeaderDefaultViewComponent({
  baseStyles,
  loading,
  title,
  logoUrl,
  providers,
  isAuthenticated,
  hasSectionOverrides,
  slotCount,
  leftSlot,
  centerSlot,
  rightSlot,
  SkeletonComponent,
  LayoutComponent,
}: AppHeaderDefaultViewProps) {
  const rootClassName = useMemo(() => `${baseStyles.root} ${defaultStyles.root}`, [baseStyles]);
  const logoPlaceholderClassName = useMemo(() => `${baseStyles.root__logo} ${defaultStyles.root__logo}`, [baseStyles]);
  const skeletonClassName = useMemo(
    () => `${baseStyles.root__skeleton} ${loading ? baseStyles['root__skeleton--visible'] : ''}`,
    [baseStyles, loading],
  );

  const leftColumn = hasSectionOverrides ? (
    <>
      <AppHeaderLogo logoUrl={logoUrl} loading={loading} logoPlaceholderClassName={logoPlaceholderClassName} />
      {leftSlot}
    </>
  ) : (
    <>
      <AppHeaderLogo logoUrl={logoUrl} loading={loading} logoPlaceholderClassName={logoPlaceholderClassName} />
      <AppHeaderIdentity isAuthenticated={isAuthenticated} />
    </>
  );

  const centerColumn = (
    <div className={layoutStyles.centerStack}>
      {hasSectionOverrides ? centerSlot : <AppHeaderPageTitle baseStyles={baseStyles} loading={loading} title={title} />}
      <AppHeaderProvidersNav providers={providers} />
    </div>
  );

  const rightColumn = hasSectionOverrides ? (
    rightSlot
  ) : isAuthenticated ? (
    <AppHeaderUserActions />
  ) : (
    <AppHeaderGuestActions />
  );

  return (
    <header
      aria-label={title || 'App Header'}
      className={rootClassName}
      data-auth={isAuthenticated ? 'true' : 'false'}
      data-sections={String(slotCount)}
      data-variant='default'
    >
      <LayoutComponent>
        <div className={baseStyles.root__sections}>
          <AppHeaderDefaultLayout left={leftColumn} center={centerColumn} right={rightColumn} />
        </div>
      </LayoutComponent>
      {loading ? (
        <div className={skeletonClassName} data-testid='app-header-skeleton'>
          <SkeletonComponent sectionCount={slotCount} />
        </div>
      ) : null}
    </header>
  );
}

export const AppHeaderDefaultView = memo(AppHeaderDefaultViewComponent);
AppHeaderDefaultView.displayName = 'AppHeaderDefaultView';
