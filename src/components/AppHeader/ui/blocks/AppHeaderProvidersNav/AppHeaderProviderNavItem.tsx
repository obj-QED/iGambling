import type { AppHeaderMenuItem } from '../../../types/AppHeader.types';
import type { MouseEvent } from 'react';

import { memo } from 'react';

import { Link } from 'react-router-dom';

import { getAppHrefKind } from '@/shared/lib';

import styles from './AppHeaderProvidersNav.module.scss';

export type AppHeaderProviderNavItemProps = {
  item: AppHeaderMenuItem;
  onItemClick?: (item: AppHeaderMenuItem, event: MouseEvent<HTMLElement>) => void;
};

function AppHeaderProviderNavItemComponent({ item, onItemClick }: AppHeaderProviderNavItemProps) {
  const url = item.url ?? '';
  const label = item.name?.trim() || 'Провайдер';
  const imageSrc = item.img?.trim() ? item.img : undefined;
  const kind = getAppHrefKind(url);
  const onClick = onItemClick ? (event: MouseEvent<HTMLElement>) => onItemClick(item, event) : undefined;

  const content = imageSrc ? (
    <img
      className={styles.providerIcon}
      src={imageSrc}
      alt={label}
      loading="lazy"
      decoding="async"
    />
  ) : (
    label
  );

  const linkProps = {
    className: styles.providerLink,
    title: label,
    'aria-label': label,
    onClick,
  } as const;

  return (
    <li className={styles.providersItem}>
      {kind === 'external' ? (
        <a href={url} rel="noopener noreferrer" target="_blank" {...linkProps}>
          {content}
        </a>
      ) : kind === 'invalid' ? (
        <span data-invalid-href {...linkProps}>
          {content}
        </span>
      ) : (
        <Link to={url} {...linkProps}>
          {content}
        </Link>
      )}
    </li>
  );
}

export const AppHeaderProviderNavItem = memo(AppHeaderProviderNavItemComponent);
AppHeaderProviderNavItem.displayName = 'AppHeaderProviderNavItem';
