import { memo } from 'react';

import styles from './AppHeaderLogo.module.scss';

export type AppHeaderLogoProps = {
  logoUrl?: string;
  loading: boolean;
  logoPlaceholderClassName: string;
};

function AppHeaderLogoComponent({ logoUrl, loading, logoPlaceholderClassName }: AppHeaderLogoProps) {
  const showLogoImg = Boolean(logoUrl) && !loading;

  if (showLogoImg && logoUrl) {
    return (
      <div className={styles.root}>
        <img className={styles.img} src={logoUrl} alt='' />
      </div>
    );
  }

  return (
    <div className={`${styles.root} ${logoPlaceholderClassName}`}>
      <span className={styles.fallback}>IG</span>
    </div>
  );
}

export const AppHeaderLogo = memo(AppHeaderLogoComponent);
AppHeaderLogo.displayName = 'AppHeaderLogo';
