import type { BlockProps } from '../../../types';

import { memo } from 'react';

import clsx from 'clsx';

import { useMediaState } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { AppButton } from '@/shared/ui';

import { useAsideMenuButtonSize } from '../../../hooks';
import {
  renderSidebarFooterIcon,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemButtonVariant,
} from '../../../lib';
import { ItemMedia } from '../../items/ItemMedia/ItemMedia';

/** On `.cmf-Button-section` / media — match menu ItemButton sizing contract. */
const CMF_BUTTON_SECTION_ICON = 'cmf-Button-section-icon';
const CMF_BUTTON_ICON = 'cmf-Button-icon';

/** Default-type footer row. Compact overrides via typePack.FooterLink. */
function SidebarFooterLinkComponent({ item }: BlockProps) {
  const { onImgError, showItemImg } = useMediaState(item);
  const size = useAsideMenuButtonSize();
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);

  const leftSection = showItemImg ? (
    <ItemMedia item={item} alt={label} onImgError={onImgError} className={CMF_BUTTON_ICON} />
  ) : (
    (renderSidebarFooterIcon(item, {
      size: 22,
      stroke: 1.5,
      className: clsx(CMF_BUTTON_ICON, 'cmf-ActionIcon-icon-svg'),
    }) ?? undefined)
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
      sectionClassNames={{
        left: leftSection !== undefined ? CMF_BUTTON_SECTION_ICON : undefined,
      }}
      active={item.active}
      matchRoute={item.matchRoute}
      activeMatch={item.activeMatch}
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'sidebar', chrome: 'footer' }))}
    />
  );
}

export const SidebarFooterLink = memo(SidebarFooterLinkComponent);
SidebarFooterLink.displayName = 'SidebarFooterLink';
