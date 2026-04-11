import type { AppHeaderMenuItem } from '../../../types/AppHeader.types';

import { memo } from 'react';

import { Link } from 'react-router-dom';

import styles from './AppHeaderProvidersNav.module.scss';

export type AppHeaderProvidersNavProps = {
  items: AppHeaderMenuItem[];
};

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function ProviderNavLink({ item }: { item: AppHeaderMenuItem }) {
  const inner = item.img ? (
    <img className={styles.providerIcon} src={item.img} alt="" loading="lazy" decoding="async" />
  ) : (
    <span>{item.name}</span>
  );

  if (isExternalUrl(item.url)) {
    return (
      <a className={styles.providerLink} href={item.url} rel="noopener noreferrer" target="_blank" aria-label={item.name}>
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

function AppHeaderProvidersNavComponent({ items }: AppHeaderProvidersNavProps) {
  if (items.length === 0) return null;

  return (
    <nav className={styles.providers} aria-label="Провайдеры">
      {items.map((item) => (
        <ProviderNavLink key={`${item.key}-${item.url}`} item={item} />
      ))}
    </nav>
  );
}

export const AppHeaderProvidersNav = memo(AppHeaderProvidersNavComponent);
AppHeaderProvidersNav.displayName = 'AppHeaderProvidersNav';
