import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { AppButton } from '@/elements/AppButton';
import { useMenuItemMediaState } from '@/shared/hooks/useMenuItemMediaState';
import { isValidAppHref } from '@/shared/lib';

import { menuItemDataAttrs, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { resolveSidebarFooterIcon } from '../../../lib/resolveSidebarFooterIcon';
import { ASIDE_MENU_BUTTON_SIZE } from '../../menu/icons/iconProps';
import { MenuItemMedia } from '../../menu/MenuItemMedia/MenuItemMedia';

import styles from '../../../styles/layout/SidebarFooter.module.scss';

function SidebarFooterLinkComponent({ item }: BlockProps) {
  const { onImgError, showItemImg } = useMenuItemMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const FallbackIcon = resolveSidebarFooterIcon(item);
  const leftSection =
    showItemImg === true ? (
      <MenuItemMedia item={item} alt={label} onImgError={onImgError} className={styles.linkIcon} />
    ) : FallbackIcon !== null ? (
      <FallbackIcon className={styles.linkIcon} size={20} stroke={1.5} />
    ) : undefined;

  return (
    <AppButton
      label={label}
      href={isValidAppHref(href) === true ? href : undefined}
      native={isValidAppHref(href) === false}
      variant="subtle"
      size={ASIDE_MENU_BUTTON_SIZE}
      fullWidth
      justify="flex-start"
      className={styles.link}
      leftSection={leftSection}
      {...menuItemDataAttrs(item)}
    />
  );
}

export const SidebarFooterLink = memo(SidebarFooterLinkComponent);
SidebarFooterLink.displayName = 'SidebarFooterLink';
