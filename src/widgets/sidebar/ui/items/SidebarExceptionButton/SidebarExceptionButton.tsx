import type { MenuItem as HeaderMenuItem } from '@/entities/menu';
import type { MouseEventHandler, ReactNode } from 'react';

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
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

function SidebarExceptionButtonComponent({
  item,
  label,
  leftSection,
  className,
  onClick,
}: SidebarExceptionButtonProps) {
  const isAction = onClick !== undefined;
  // Action triggers (e.g. global search) must not go through href → '' → disabled.
  const href = isAction ? undefined : resolveItemHref(item.url);
  const size = useAsideMenuButtonSize();
  return (
    <AppButton
      label={label}
      href={href}
      native={isAction}
      variant={resolveMenuItemButtonVariant(item)}
      size={size}
      fullscreen
      justify="flex-start"
      className={clsx(styles.root, className)}
      leftSection={leftSection}
      active={isAction ? false : item.active}
      matchRoute={isAction ? false : item.matchRoute}
      activeMatch={item.activeMatch}
      onClick={onClick}
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'sidebar' }))}
    />
  );
}

export const SidebarExceptionButton = memo(SidebarExceptionButtonComponent);
SidebarExceptionButton.displayName = 'SidebarExceptionButton';
