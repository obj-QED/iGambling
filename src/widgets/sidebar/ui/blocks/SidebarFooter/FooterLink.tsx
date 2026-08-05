import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { AppButton } from '@/elements';
import { useMediaState } from '@/shared/hooks';

import { useAsideMenuButtonSize } from '../../../hooks';
import {
  menuItemDataAttrs,
  renderSidebarFooterIcon,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemButtonVariant,
} from '../../../lib';
import { ItemMedia } from '../../items/ItemMedia/ItemMedia';

/** Default-type footer row. Compact overrides via typePack.FooterLink. */
function SidebarFooterLinkComponent({ item }: BlockProps) {
  const { onImgError, showItemImg } = useMediaState(item);
  const size = useAsideMenuButtonSize();
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);

  const leftSection = showItemImg ? (
    <ItemMedia item={item} alt={label} onImgError={onImgError} />
  ) : (
    (renderSidebarFooterIcon(item, { size: 20, stroke: 1.5 }) ?? undefined)
  );

  return (
    <AppButton
      label={label}
      href={href}
      variant={resolveMenuItemButtonVariant(item)}
      size={size}
      fullscreen
      justify="flex-start"
      leftSection={leftSection}
      {...menuItemDataAttrs(item)}
    />
  );
}

export const SidebarFooterLink = memo(SidebarFooterLinkComponent);
SidebarFooterLink.displayName = 'SidebarFooterLink';
