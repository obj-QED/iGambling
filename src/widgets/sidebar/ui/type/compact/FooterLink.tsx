import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { AppActionIcon } from '@/elements';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';

import { useAsideMenuButtonSize } from '../../../hooks';
import {
  hasItemImg,
  renderSidebarFooterIcon,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
} from '../../../lib';
import { useSidebarTypePack } from '../useSidebarTypePack';

function CompactFooterLinkComponent({ item }: BlockProps) {
  const { Item } = useSidebarTypePack();
  const size = useAsideMenuButtonSize();
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const fallbackIcon = renderSidebarFooterIcon(item, {
    className: 'cmf-ActionIcon-icon-svg',
    stroke: 1.5,
    'aria-hidden': true,
  });

  if (!hasItemImg(item) && fallbackIcon) {
    return (
      <AppActionIcon
        name={item.name}
        img={item.img}
        href={href}
        variant={resolveMenuItemActionIconVariant(item)}
        size={size}
        aria-label={label}
        {...controlAttrs(item, resolveCmfScope(item, { widget: 'sidebar', chrome: 'footer' }))}
      >
        {fallbackIcon}
      </AppActionIcon>
    );
  }

  return <Item item={item} chrome="footer" />;
}

export const CompactFooterLink = memo(CompactFooterLinkComponent);
CompactFooterLink.displayName = 'SidebarCompactFooterLink';
