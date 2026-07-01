import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { Badge, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

import { useMenuItemMediaState } from '@/shared/hooks/useMenuItemMediaState';
import { isValidAppHref } from '@/shared/lib';
import { AppLink } from '@/shared/ui';

import { menuItemDataAttrs, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { MenuItemMedia } from '../../menu/MenuItemMedia/MenuItemMedia';

import styles from '../../../styles/layout/SidebarHeader.module.scss';

function hasAccountSubtitle(subtitle: string | undefined): subtitle is string {
  return subtitle !== undefined && subtitle.length > 0;
}

function SidebarHeaderLinkComponent({ item }: BlockProps) {
  const { onImgError, showItemImg } = useMenuItemMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const subtitle = item.subtitle;
  const badge = item.badge;
  const isAccountProfile = hasAccountSubtitle(subtitle);
  const avatar = showItemImg ? (
    <MenuItemMedia
      item={item}
      alt={label}
      onImgError={onImgError}
      className={isAccountProfile === true ? styles.mainLinkAvatar : styles.mainLinkIcon}
    />
  ) : null;

  const textBlock =
    isAccountProfile === true ? (
      <div className={styles.mainLinkText}>
        <span className={styles.mainLinkTitle}>{label}</span>
        <span className={styles.mainLinkSubtitle}>{subtitle}</span>
      </div>
    ) : (
      <span>{label}</span>
    );

  const content = (
    <>
      <div className={styles.mainLinkInner}>
        {avatar}
        {textBlock}
      </div>
      {isAccountProfile === true ? (
        <IconChevronRight className={styles.mainLinkChevron} size={16} stroke={1.5} aria-hidden />
      ) : null}
      {isAccountProfile === false && badge !== undefined && String(badge).length > 0 ? (
        <Badge size="sm" variant="filled" className={styles.mainLinkBadge}>
          {badge}
        </Badge>
      ) : null}
    </>
  );

  if (isValidAppHref(href) === false) {
    return (
      <UnstyledButton className={styles.mainLink} disabled {...menuItemDataAttrs(item)}>
        {content}
      </UnstyledButton>
    );
  }

  return (
    <UnstyledButton
      component={AppLink}
      href={href}
      className={styles.mainLink}
      {...menuItemDataAttrs(item)}
    >
      {content}
    </UnstyledButton>
  );
}

export const SidebarHeaderLink = memo(SidebarHeaderLinkComponent);
SidebarHeaderLink.displayName = 'SidebarHeaderLink';
