import type { AppHeaderViewProps } from '@AppHeader/types/AppHeader.types';

import { memo, useMemo } from 'react';

import { flattenAppHeaderMenuSections } from '@AppHeader/lib/menuItems';
import { LAYOUT_COMPONENTS, SKELETON_COMPONENTS } from '@AppHeader/ui/AppHeader';
import { AppHeaderLogoItem } from '@AppHeader/ui/blocks/AppHeaderLogoItem/AppHeaderLogoItem';
import { AppHeaderMenuItemRenderer } from '@AppHeader/ui/blocks/AppHeaderMenuItemRenderer/AppHeaderMenuItemRenderer';

import baseStyles from '@AppHeader/styles/base/AppHeaderBase.module.scss';
import classicStyles from '@AppHeader/styles/variants/AppHeaderClassic.module.scss';

function AppHeaderClassicViewComponent({ params, data, loading }: AppHeaderViewProps) {
  const LayoutComponent = LAYOUT_COMPONENTS[params.layout];
  const SkeletonComponent = SKELETON_COMPONENTS[params.variant];
  const showSkeleton = loading;

  const rootClassName = useMemo(
    () => `${baseStyles.root} ${classicStyles.root}`,
    [],
  );

  const menu = useMemo(() => flattenAppHeaderMenuSections(data?.menu), [data?.menu]);
  const logo = menu.find((item) => item.key === 'logo');
  const menuItems = useMemo(
    () => menu?.filter((item) => item.key !== 'logo'),
    [menu],
  );

  return (
    <header className={rootClassName} data-variant="classic">
      <LayoutComponent>
        <div className={classicStyles.shell}>
          <div className={classicStyles.brand}>
            {logo ? <AppHeaderLogoItem item={logo} /> : <div className={baseStyles.root__logo}>IG</div>}
          </div>
          <div className={classicStyles.main}>
            {menuItems?.map((item) => (
              <AppHeaderMenuItemRenderer key={item.key} item={item} />
            ))}
          </div>
        </div>
      </LayoutComponent>
      {showSkeleton ? (
        <div className={baseStyles.root__skeleton} data-testid="app-header-skeleton">
          <SkeletonComponent menu={data?.menu} />
        </div>
      ) : null}
    </header>
  );
}

export const AppHeaderClassicView = memo(AppHeaderClassicViewComponent);
AppHeaderClassicView.displayName = 'AppHeaderClassicView';
