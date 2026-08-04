import type { HeaderMenuItem } from '@/widgets/header';
import type { ReactNode } from 'react';

import { memo } from 'react';

import clsx from 'clsx';

import { AppButton } from '@/elements';
import { useNavActive } from '@/shared/hooks';

import { useAsideMenuButtonSize } from '../../../hooks';
import { menuItemDataAttrs, resolveItemHref, resolveMenuItemButtonVariant } from '../../../lib';

import styles from '../../../styles/items/SidebarExceptionButton.module.scss';

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
  const { activeAttrs } = useNavActive(item);
  const size = useAsideMenuButtonSize();

  return (
    <AppButton
      label={label}
      href={href}
      variant={resolveMenuItemButtonVariant(item)}
      size={size}
      fullscreen
      justify="flex-start"
      className={clsx(styles.root, className)}
      leftSection={leftSection}
      {...menuItemDataAttrs(item)}
      {...activeAttrs}
    />
  );
}

export const SidebarExceptionButton = memo(SidebarExceptionButtonComponent);
SidebarExceptionButton.displayName = 'SidebarExceptionButton';
