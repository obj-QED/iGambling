import { memo } from 'react';

import styles from '../styles/AppBannerBase.module.scss';

function AppBannerComponent() {
  return (
    <div className={styles.root}>
      {/* промо-баннеры, слайдер */}
    </div>
  );
}

export const AppBanner = memo(AppBannerComponent);
AppBanner.displayName = 'AppBanner';
