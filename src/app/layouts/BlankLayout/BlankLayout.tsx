import { memo } from 'react';

import { Outlet } from 'react-router-dom';

import styles from './BlankLayout.module.scss';

/**
 * Empty shell without header/sidebar/footer.
 * Auth / activation / system pages that must not mount lobby chrome.
 */
function BlankLayoutComponent() {
  return (
    <div className={styles.root} data-cmf-component="blank-layout">
      <Outlet />
    </div>
  );
}

export const BlankLayout = memo(BlankLayoutComponent);
BlankLayout.displayName = 'BlankLayout';
