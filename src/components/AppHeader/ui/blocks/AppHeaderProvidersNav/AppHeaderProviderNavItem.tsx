import type { AppHeaderMenuItem } from '../../../types/AppHeader.types';
import type { ButtonProps as MantineButtonProps } from '@mantine/core';
import type { MouseEvent } from 'react';

import { memo } from 'react';

import { Button } from '@mantine/core';
import { IconPlug } from '@tabler/icons-react';

import { getMantineAppHrefProps } from '@/shared/ui/AppLink';

import styles from './AppHeaderProvidersNav.module.scss';

export type AppHeaderProviderNavItemProps = {
  item: AppHeaderMenuItem;
  onItemClick?: (item: AppHeaderMenuItem, event: MouseEvent<HTMLElement>) => void;
};

function AppHeaderProviderNavItemComponent({ item, onItemClick }: AppHeaderProviderNavItemProps) {
  const url = item.url ?? '';
  const label = item.name?.trim() || 'Provider';
  const imageSrc = item.img?.trim() ? item.img : undefined;
  const navProps = getMantineAppHrefProps(url);
  const onClick = onItemClick ? (event: MouseEvent<HTMLElement>) => onItemClick(item, event) : undefined;

  const content = imageSrc ? (
    <img
      className={styles.providerIcon}
      src={imageSrc}
      alt=""
      loading="lazy"
      decoding="async"
    />
  ) : (
    <IconPlug size={22} stroke={1.5} aria-hidden />
  );

  const buttonProps = {
    className: styles.providerLink,
    title: label,
    'aria-label': label,
    variant: item.buttonVariant ?? ('light' as const),
    color: item.buttonColor,
    size: item.buttonSize ?? ('compact-sm' as const),
    radius: item.buttonRadius,
    onClick,
    children: content,
  };

  return (
    <li className={styles.providersItem}>
      <Button {...({ ...buttonProps, ...navProps } as unknown as MantineButtonProps)} />
    </li>
  );
}

export const AppHeaderProviderNavItem = memo(AppHeaderProviderNavItemComponent);
AppHeaderProviderNavItem.displayName = 'AppHeaderProviderNavItem';
