import type { AppHeaderMenuItem, AppHeaderViewProps } from '@AppHeader/types/AppHeader.types';

import { memo } from 'react';

import { getAppHeaderSectionItems } from '@AppHeader/lib/menuItems';
import { LAYOUT_COMPONENTS, SKELETON_COMPONENTS } from '@AppHeader/ui/AppHeader';
import { AppHeaderMenuItemRenderer } from '@AppHeader/ui/blocks/AppHeaderMenuItemRenderer/AppHeaderMenuItemRenderer';

import { useMergedModuleClasses } from '@shared/lib';

import baseStyles from '@AppHeader/styles/base/AppHeaderBase.module.scss';
import defaultStyles from '@AppHeader/styles/variants/AppHeaderDefault.module.scss';

function AppHeaderDefaultViewComponent({ params, data, loading }: AppHeaderViewProps) {
  const LayoutComponent = LAYOUT_COMPONENTS[params.layout];
  const SkeletonComponent = SKELETON_COMPONENTS[params.variant];
  const showSkeleton = loading;
  const classes = useMergedModuleClasses(baseStyles, defaultStyles);
  const sections = data?.menu ?? [];

  const themeMenuItem = {
    key: 'theme',
    name: 'Theme',
    url: '/test',
    img: '',
  } satisfies AppHeaderMenuItem;

  const sectionThemeAdded = sections.map((section) =>
    section.key === 'block1'
      ? {
          ...section,
          items: [...(section.items ?? []), themeMenuItem],
        }
      : section,
  );

  return (
    <header className={classes.root}>
      <LayoutComponent>
        <div className={baseStyles.root__sections}>
          {sectionThemeAdded.map((section) => (
            <div key={section.key} className={baseStyles.root__section} data-section={section.key}>
              {getAppHeaderSectionItems(section).map((item) => (
                <AppHeaderMenuItemRenderer key={item.key} item={item} />
              ))}
            </div>
          ))}
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

export const AppHeaderDefaultView = memo(AppHeaderDefaultViewComponent);
AppHeaderDefaultView.displayName = 'AppHeaderDefaultView';
