import type { HeaderMenuItem } from '@/widgets/header';
import type { ReactNode } from 'react';

import { memo } from 'react';

import clsx from 'clsx';

import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { AppButton } from '@/shared/ui';

import { useAsideMenuButtonSize } from '../../../hooks';
import { resolveItemHref, resolveMenuItemButtonVariant } from '../../../lib';

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
      active={item.active}
      matchRoute={item.matchRoute}
      activeMatch={item.activeMatch}
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'sidebar' }))}
    />
  );
}

export const SidebarExceptionButton = memo(SidebarExceptionButtonComponent);
SidebarExceptionButton.displayName = 'SidebarExceptionButton';
