import type { HeaderProviderItem } from '../../../types/AppHeader.types';

import { memo } from 'react';

import { Link } from 'react-router-dom';

import styles from './AppHeaderProvidersNav.module.scss';

export type AppHeaderProvidersNavProps = {
  providers: HeaderProviderItem[];
};

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function ProviderNavLink({ item }: { item: HeaderProviderItem }) {
  const inner = <img className={styles.providerIcon} src={item.icon} alt='' loading='lazy' decoding='async' />;

  if (isExternalUrl(item.url)) {
    return (
      <a className={styles.providerLink} href={item.url} rel='noopener noreferrer' target='_blank' aria-label={item.name}>
        {inner}
      </a>
    );
  }

  return (
    <Link className={styles.providerLink} to={item.url} aria-label={item.name}>
      {inner}
    </Link>
  );
}

function AppHeaderProvidersNavComponent({ providers }: AppHeaderProvidersNavProps) {
  if (providers.length === 0) return null;

  return (
    <nav className={styles.providers} aria-label='Провайдеры'>
      {providers.map((item) => (
        <ProviderNavLink key={`${item.name}-${item.url}`} item={item} />
      ))}
    </nav>
  );
}

export const AppHeaderProvidersNav = memo(AppHeaderProvidersNavComponent);
AppHeaderProvidersNav.displayName = 'AppHeaderProvidersNav';
