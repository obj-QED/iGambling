import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { Badge } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

import { AppButton } from '@/elements';
import { useMediaState, useNavActive } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';

import { useAsideMenuButtonSize } from '../../../hooks';
import { resolveItemHref, resolveItemLabel, resolveMenuItemButtonVariant } from '../../../lib';
import { ItemMedia } from '../../items/ItemMedia/ItemMedia';

import styles from '../../../styles/blocks/SidebarHeader.module.scss';

function hasAccountSubtitle(subtitle: string | undefined): subtitle is string {
  return subtitle !== undefined && subtitle.length > 0;
}

/** Default-type header row. Compact overrides via typePack.HeaderLink. */
function SidebarHeaderLinkComponent({ item }: BlockProps) {
  const { onImgError, showItemImg } = useMediaState(item);
  const { activeAttrs } = useNavActive(item);
  const size = useAsideMenuButtonSize();
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);

  const subtitle = item.subtitle;
  const badge = item.badge;
  const isAccountProfile = hasAccountSubtitle(subtitle);
  const avatar = showItemImg ? (
    <ItemMedia
      item={item}
      alt={label}
      onImgError={onImgError}
      className={isAccountProfile ? styles.mainLinkAvatar : styles.mainLinkIcon}
    />
  ) : undefined;

  const labelContent = isAccountProfile ? (
    <div className={styles.mainLinkText}>
      <span className={styles.mainLinkTitle}>{label}</span>
      <span className={styles.mainLinkSubtitle}>{subtitle}</span>
    </div>
  ) : (
    label
  );

  const rightSection = isAccountProfile ? (
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
      variant={resolveMenuItemButtonVariant(item)}
      size={size}
      fullscreen
      justify="space-between"
      className={styles.mainLink}
      leftSection={avatar}
      rightSection={rightSection}
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'sidebar', chrome: 'header' }))}
      {...activeAttrs}
    />
  );
}

export const SidebarHeaderLink = memo(SidebarHeaderLinkComponent);
SidebarHeaderLink.displayName = 'SidebarHeaderLink';
