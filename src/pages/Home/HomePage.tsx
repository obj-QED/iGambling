import { memo } from 'react';

import styles from './HomePage.module.scss';

function HomePageComponent() {
  return (
    <section className={styles.root}>
      {/* home page content */}
    </section>
  );
}

export const HomePage = memo(HomePageComponent);
HomePage.displayName = 'HomePage';
