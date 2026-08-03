import type { HeaderMenuItem } from '@/widgets/header';
import type { ReactNode } from 'react';

import { memo } from 'react';

import clsx from 'clsx';

import { AppButton } from '@/elements/AppButton';
import { useMenuActive } from '@/shared/hooks/useMenuActive';

import { useAsideMenuButtonSize } from '../../../hooks/useAsideMenuButtonSize';
import { menuItemDataAttrs, resolveItemHref } from '../../../lib/itemUtils';
import { resolveMenuItemButtonVariant } from '../../../lib/menuItemVariant';

import styles from '../../../styles/menu/SidebarExceptionButton.module.scss';

export type SidebarExceptionButtonProps = {
  item: HeaderMenuItem;
  label?: string;
  leftSection?: ReactNode;
  className?: string;
};

function SidebarExceptionButtonComponent({
  item,
  label,
  leftSection,
  className,
}: SidebarExceptionButtonProps) {
  const href = resolveItemHref(item.url);
  const { menuActiveAttrs } = useMenuActive(item);
  const size = useAsideMenuButtonSize();

  return (
    <AppButton
      label={label}
      href={href}
      variant={resolveMenuItemButtonVariant(item)}
      size={size}
      fullWidth
      justify="flex-start"
      className={clsx(styles.root, className)}
      leftSection={leftSection}
      {...menuItemDataAttrs(item)}
      {...menuActiveAttrs}
    />
  );
}

export const SidebarExceptionButton = memo(SidebarExceptionButtonComponent);
SidebarExceptionButton.displayName = 'SidebarExceptionButton';
