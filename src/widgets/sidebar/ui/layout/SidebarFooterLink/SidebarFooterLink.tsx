import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { AppButton } from '@/elements/AppButton';
import { useMediaState } from '@/shared/hooks/useMediaState';

import { useAsideMenuButtonSize } from '../../../hooks/useAsideMenuButtonSize';
import { menuItemDataAttrs, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { resolveSidebarFooterIcon } from '../../../lib/resolveSidebarFooterIcon';
import { MenuItemMedia } from '../../menu/MenuItemMedia/MenuItemMedia';

function SidebarFooterLinkComponent({ item }: BlockProps) {
  const { onImgError, showItemImg } = useMediaState(item);
  const size = useAsideMenuButtonSize();
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const FallbackIcon = resolveSidebarFooterIcon(item);
  const leftSection =
    showItemImg === true ? (
      <MenuItemMedia item={item} alt={label} onImgError={onImgError} />
    ) : FallbackIcon !== null ? (
      <FallbackIcon size={20} stroke={1.5} />
    ) : undefined;

  return (
    <AppButton
      label={label}
      href={href}
      variant="subtle"
      size={size}
      fullWidth
      justify="flex-start"
      leftSection={leftSection}
      {...menuItemDataAttrs(item)}
    />
  );
}

export const SidebarFooterLink = memo(SidebarFooterLinkComponent);
SidebarFooterLink.displayName = 'SidebarFooterLink';
