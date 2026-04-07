import type { ReactNode } from 'react';

import { memo } from 'react';

import styles from './AppHeaderDefaultLayout.module.scss';

export type AppHeaderDefaultLayoutProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
};

function AppHeaderDefaultLayoutComponent({ left, center, right }: AppHeaderDefaultLayoutProps) {
  return (
    <div className={styles.root}>
      <section className={`${styles.section} ${styles['section--left']}`} aria-label='Бренд и пользователь'>
        <div className={styles.section__inner}>{left}</div>
      </section>
      <section className={`${styles.section} ${styles['section--center']}`} aria-label='Заголовок и провайдеры'>
        <div className={styles.section__inner}>{center}</div>
      </section>
      <section className={`${styles.section} ${styles['section--right']}`} aria-label='Действия'>
        <div className={styles.section__inner}>{right}</div>
      </section>
    </div>
  );
}

export const AppHeaderDefaultLayout = memo(AppHeaderDefaultLayoutComponent);
AppHeaderDefaultLayout.displayName = 'AppHeaderDefaultLayout';
