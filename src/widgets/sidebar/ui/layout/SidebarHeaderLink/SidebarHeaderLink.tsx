import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { Badge } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

import { AppButton } from '@/elements/AppButton';
import { useMenuActive } from '@/shared/hooks/useMenuActive';
import { useMediaState } from '@/shared/hooks/useMediaState';

import { useAsideMenuButtonSize } from '../../../hooks/useAsideMenuButtonSize';
import { menuItemDataAttrs, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { MenuItemMedia } from '../../menu/MenuItemMedia/MenuItemMedia';

import styles from '../../../styles/layout/SidebarHeader.module.scss';

function hasAccountSubtitle(subtitle: string | undefined): subtitle is string {
  return subtitle !== undefined && subtitle.length > 0;
}

function SidebarHeaderLinkComponent({ item }: BlockProps) {
  const { onImgError, showItemImg } = useMediaState(item);
  const { menuActiveAttrs } = useMenuActive(item);
  const size = useAsideMenuButtonSize();
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
  ) : undefined;

  const labelContent =
    isAccountProfile === true ? (
      <div className={styles.mainLinkText}>
        <span className={styles.mainLinkTitle}>{label}</span>
        <span className={styles.mainLinkSubtitle}>{subtitle}</span>
      </div>
    ) : (
      label
    );

  const rightSection =
    isAccountProfile === true ? (
      <IconChevronRight className={styles.mainLinkChevron} size={16} stroke={1.5} aria-hidden />
    ) : badge !== undefined && String(badge).length > 0 ? (
      <Badge size="sm" variant="filled" className={styles.mainLinkBadge}>
        {badge}
      </Badge>
    ) : undefined;

  return (
    <AppButton
      href={href}
      label={labelContent}
      variant="transparent"
      size={size}
      fullWidth
      justify="space-between"
      className={styles.mainLink}
      leftSection={avatar}
      rightSection={rightSection}
      {...menuItemDataAttrs(item)}
      {...menuActiveAttrs}
    />
  );
}

export const SidebarHeaderLink = memo(SidebarHeaderLinkComponent);
SidebarHeaderLink.displayName = 'SidebarHeaderLink';
