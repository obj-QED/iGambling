import { memo } from 'react';

import styles from '../styles/AppFooterBase.module.scss';

function AppFooterComponent() {
  return (
    <footer className={styles.root}>
      {/* links, licenses, copyright */}
    </footer>
  );
}

export const AppFooter = memo(AppFooterComponent);
AppFooter.displayName = 'AppFooter';
