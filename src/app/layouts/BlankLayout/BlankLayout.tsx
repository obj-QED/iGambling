import { memo } from 'react';

import { Outlet } from 'react-router-dom';

import styles from './BlankLayout.module.scss';

/**
 * Пустой layout без sidebar.
 * Используется для auth, ошибок (404/500) и системных страниц.
 */
function BlankLayoutComponent() {
  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
}

export const BlankLayout = memo(BlankLayoutComponent);
BlankLayout.displayName = 'BlankLayout';
