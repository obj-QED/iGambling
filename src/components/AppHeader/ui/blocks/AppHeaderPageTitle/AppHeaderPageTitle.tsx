import type { AppHeaderBaseStyles } from '../../../types/AppHeader.types';

import { memo } from 'react';

export type AppHeaderPageTitleProps = {
  baseStyles: AppHeaderBaseStyles;
  loading: boolean;
  title: string;
};

function AppHeaderPageTitleComponent({ baseStyles, loading, title }: AppHeaderPageTitleProps) {
  return (
    <h1 className={`${baseStyles.root__title} ${loading ? baseStyles['root__title--hidden'] : ''}`} data-testid='app-header-title'>
      {title}
    </h1>
  );
}

export const AppHeaderPageTitle = memo(AppHeaderPageTitleComponent);
AppHeaderPageTitle.displayName = 'AppHeaderPageTitle';
