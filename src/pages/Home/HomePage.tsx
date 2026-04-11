import { memo } from 'react';

import styles from './HomePage.module.scss';

function HomePageComponent() {
  return (
    <section className={styles.root}>
      {/* страничный контент главной */}
    </section>
  );
}

export const HomePage = memo(HomePageComponent);
HomePage.displayName = 'HomePage';
