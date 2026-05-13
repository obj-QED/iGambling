import { memo, useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { useCurrentPageData } from '@api/lobby';
import { useLanguage } from '@hooks/useLanguage';

import styles from '../styles/AppSidebarBase.module.scss';

function getMenuItemsCount(menus: unknown): number {
  if (!Array.isArray(menus)) return 0;
  return menus.length;
}

function AppSidebarComponent() {
  const language = useLanguage();
  const location = useLocation();
  const pageData = useCurrentPageData(language, location.pathname || '/');
  const menuItemsCount = useMemo(() => getMenuItemsCount(pageData?.menu), [pageData?.menu]);

  return (
    <aside className={styles.root}>
      <div className={styles.root__meta}>
        Menu items: {menuItemsCount}
      </div>
    </aside>
  );
}

export const AppSidebar = memo(AppSidebarComponent);
AppSidebar.displayName = 'AppSidebar';
