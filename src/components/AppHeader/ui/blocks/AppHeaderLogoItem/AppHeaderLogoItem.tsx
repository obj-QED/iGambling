import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

import { memo } from 'react';

import ReactInlineSvg from 'react-inlinesvg';

import { AppLink } from '@ui';

import styles from './AppHeaderLogoItem.module.scss';

type AppHeaderLogoItemProps = {
  item: AppHeaderMenuItem;
};

function AppHeaderLogoItemComponent({ item }: AppHeaderLogoItemProps) {
  const label = item.name?.trim() || item.key || 'logo';
  const href = item.url?.trim() || '/';
  const imageUrl = item.img?.trim();
  const fallbackLabel = label.slice(0, 2).toUpperCase();
  const isSvg = Boolean(imageUrl) && imageUrl.toLowerCase().endsWith('.svg');

  return (
    <AppLink href={href} aria-label={label} className={styles.root}>
      {imageUrl ? (
        isSvg ? (
          <ReactInlineSvg src={imageUrl} className={styles.img} title={label} />
        ) : (
          <img className={styles.img} src={imageUrl} alt={label} />
        )
      ) : (
        <span className={styles.fallback}>{fallbackLabel}</span>
      )}
    </AppLink>
  );
}

export const AppHeaderLogoItem = memo(AppHeaderLogoItemComponent);
AppHeaderLogoItem.displayName = 'AppHeaderLogoItem';
