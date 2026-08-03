import type { BlockProps } from '../../types';

import { memo } from 'react';

import { AppActionIcon } from '@/elements';

import { useAsideMenuButtonSize } from '../../hooks';
import {
  hasItemImg,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
  resolveSidebarFooterIcon,
} from '../../lib';
import { useSidebarTypePack } from '../useSidebarTypePack';

function CompactFooterLinkComponent({ item }: BlockProps) {
  const { Item } = useSidebarTypePack();
  const size = useAsideMenuButtonSize();
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const FallbackIcon = resolveSidebarFooterIcon(item);

  if (!hasItemImg(item) && FallbackIcon) {
    return (
      <AppActionIcon
        name={item.name}
        img={item.img}
        href={href}
        variant={resolveMenuItemActionIconVariant(item)}
        size={size}
        aria-label={label}
        {...menuItemDataAttrs(item)}
      >
        <FallbackIcon className="cmf-ActionIcon-icon-svg" stroke={1.5} aria-hidden />
      </AppActionIcon>
    );
  }

  return <Item item={item} />;
}

export const CompactFooterLink = memo(CompactFooterLinkComponent);
CompactFooterLink.displayName = 'SidebarCompactFooterLink';
