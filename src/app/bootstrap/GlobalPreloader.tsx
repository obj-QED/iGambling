import styles from './GlobalPreloader.module.scss';

export function GlobalPreloader() {
  return (
    <div className={styles.root} role="status" aria-live="polite" aria-label="Loading">
      <div className={styles.inner}>
        <div className={styles.spinner} />
        <span className={styles.text}>Loading…</span>
      </div>
    </div>
  );
}

GlobalPreloader.displayName = 'GlobalPreloader';
