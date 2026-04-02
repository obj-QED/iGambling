import { Outlet } from 'react-router-dom';

import styles from './BlankLayout.module.scss';

/**
 * Пустой layout без sidebar.
 * Используется для auth, ошибок (404/500) и системных страниц.
 */
export function BlankLayout() {
  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
}

BlankLayout.displayName = 'BlankLayout';
