import type { AppHeaderResolvedSlotProps } from '../../../types/AppHeader.types';
import type { CSSProperties } from 'react';
import type { ComponentType, ReactNode } from 'react';

import { memo, useMemo } from 'react';

import classicStyles from '../../../styles/variants/AppHeaderClassic.module.scss';

type AppHeaderClassicViewProps = AppHeaderResolvedSlotProps & {
  LayoutComponent: ComponentType<{ children: ReactNode }>;
};

function AppHeaderClassicViewComponent({
  baseStyles,
  loading,
  title,
  isAuthenticated,
  slotCount,
  leftSlot,
  centerSlot,
  rightSlot,
  SkeletonComponent,
  LayoutComponent,
}: AppHeaderClassicViewProps) {
  const rootClassName = useMemo(() => `${baseStyles.root} ${classicStyles.root}`, [baseStyles]);
  const logoClassName = useMemo(() => `${baseStyles.root__logo} ${classicStyles.root__logo}`, [baseStyles]);
  const skeletonClassName = useMemo(
    () => `${baseStyles.root__skeleton} ${loading ? baseStyles['root__skeleton--visible'] : ''}`,
    [baseStyles, loading],
  );

  const brandContent = leftSlot;
  const mainSlots = useMemo(() => {
    if (slotCount <= 1) return [];
    if (slotCount === 2) return [centerSlot].filter((n): n is ReactNode => n != null);
    return [centerSlot, rightSlot].filter((n): n is ReactNode => n != null);
  }, [slotCount, centerSlot, rightSlot]);

  const mainGridStyle = useMemo(
    () =>
      ({
        '--app-header-main-section-count': Math.max(1, mainSlots.length),
      }) as CSSProperties,
    [mainSlots.length],
  );

  return (
    <header
      aria-label={title || 'App Header'}
      className={rootClassName}
      data-auth={isAuthenticated ? 'true' : 'false'}
      data-sections={String(slotCount)}
      data-variant='classic'
    >
      <LayoutComponent>
        <div className={classicStyles.shell}>
          <div className={classicStyles.brand}>
            <div className={logoClassName}>IG</div>
            {brandContent}
          </div>
          {slotCount > 1 ? (
            <div className={classicStyles.main} style={mainGridStyle}>
              {mainSlots.map((content, idx) => (
                <div key={idx} className={classicStyles['main-cell']}>
                  {content}
                </div>
              ))}
            </div>
          ) : null}
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

export const AppHeaderClassicView = memo(AppHeaderClassicViewComponent);
AppHeaderClassicView.displayName = 'AppHeaderClassicView';
