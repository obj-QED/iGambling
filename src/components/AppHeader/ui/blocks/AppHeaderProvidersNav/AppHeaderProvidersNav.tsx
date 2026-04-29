import type { AppHeaderMenuItem } from '../../../types/AppHeader.types';
import type { MouseEvent } from 'react';

import { memo } from 'react';

import { AppHeaderProviderNavItem } from './AppHeaderProviderNavItem';

import styles from './AppHeaderProvidersNav.module.scss';

function providerNavItemKey(item: AppHeaderMenuItem): string {
  return item.key || `${item.name}-${item.url}`;
}

export type AppHeaderProvidersNavProps = {
  items: AppHeaderMenuItem[];
  /** Analytics, navigation cancel via `preventDefault`, modals, etc. */
  onItemClick?: (item: AppHeaderMenuItem, event: MouseEvent<HTMLElement>) => void;
};

function AppHeaderProvidersNavComponent({ items, onItemClick }: AppHeaderProvidersNavProps) {
  if (items.length === 0) return null;

  return (
    <nav className={styles.providers} aria-label="Providers">
      <ul className={styles.providersList}>
        {items.map((item) => (
          <AppHeaderProviderNavItem
            key={providerNavItemKey(item)}
            item={item}
            onItemClick={onItemClick}
          />
        ))}
      </ul>
    </nav>
  );
}

export const AppHeaderProvidersNav = memo(AppHeaderProvidersNavComponent);
AppHeaderProvidersNav.displayName = 'AppHeaderProvidersNav';
