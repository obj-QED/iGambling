import type { PopoverWrapperProps } from '../types/props.types';

import { Children, cloneElement, isValidElement, memo, useMemo, useState } from 'react';

import { Popover } from '@mantine/core';
import clsx from 'clsx';

import themeClasses from '@/assets/theme/mantine/styles/components.module.scss';
import { resolvePopoverDropdownVars } from '@/assets/theme/mantine/vars/popoverVars';
import { getPopoverDefaultProps, mergeOverlayDefaultProps } from '@/shared/config';

function PopoverWrapperComponent({
  target,
  children,
  opened: openedProp,
  onClose,
  className,
  classNames,
  portalTarget,
  'data-cmf-component': dataCmfComponent,
  'data-cmf-key': dataCmfKey,
  'data-cmf-role': dataCmfRole,
  ...popoverProps
}: PopoverWrapperProps) {
  const defaults = getPopoverDefaultProps();
  const [uncontrolled, setUncontrolled] = useState(() => defaults.defaultOpened === true);
  const controlled = openedProp !== undefined;
  const opened = controlled ? openedProp : uncontrolled;

  const close = () => {
    if (!controlled) setUncontrolled(false);
    onClose?.();
  };

  const open = () => {
    if (!controlled) setUncontrolled(true);
  };

  const trigger =
    isValidElement(target) && Children.count(target) === 1
      ? cloneElement(target as React.ReactElement<{ onClick?: () => void }>, {
          onClick: () => {
            const prev = (target as React.ReactElement<{ onClick?: () => void }>).props.onClick;
            prev?.();
            if (opened) close();
            else open();
          },
        })
      : target;

  const cmfAttrs = {
    ...(dataCmfComponent ? { 'data-cmf-component': dataCmfComponent } : {}),
    ...(dataCmfKey ? { 'data-cmf-key': dataCmfKey } : {}),
    ...(dataCmfRole ? { 'data-cmf-role': dataCmfRole } : {}),
  };

  const instanceOverrides: Record<string, unknown> = {
    ...popoverProps,
    ...(classNames ? { classNames } : {}),
    ...(portalTarget != null
      ? { portalProps: { ...(popoverProps.portalProps ?? {}), target: portalTarget } }
      : {}),
  };

  const merged = mergeOverlayDefaultProps(defaults as Record<string, unknown>, instanceOverrides);

  const {
    classNames: mergedClassNames,
    className: _ignoredClassName,
    defaultOpened: _ignoredDefaultOpened,
    onClose: settingsOnClose,
    onOpen: settingsOnOpen,
    onDismiss: settingsOnDismiss,
    onChange: _ignoredOnChange,
    ...restPopover
  } = merged as Record<string, unknown> & {
    classNames?: { dropdown?: string; arrow?: string; overlay?: string };
    className?: string;
    defaultOpened?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    onDismiss?: () => void;
    onChange?: (opened: boolean) => void;
  };

  const popoverVars = useMemo(
    () =>
      resolvePopoverDropdownVars({
        ...cmfAttrs,
        radius: restPopover.radius,
        shadow: restPopover.shadow,
      }),
    [dataCmfComponent, dataCmfKey, dataCmfRole, restPopover.radius, restPopover.shadow],
  );

  return (
    <Popover
      {...restPopover}
      opened={opened}
      onChange={(next) => {
        if (next) {
          open();
          settingsOnOpen?.();
        } else {
          close();
          settingsOnClose?.();
        }
      }}
      onDismiss={settingsOnDismiss}
      classNames={{
        dropdown: clsx(themeClasses.popoverDropdown, mergedClassNames?.dropdown, className),
        arrow: clsx(themeClasses.popoverArrow, mergedClassNames?.arrow),
        overlay: clsx(themeClasses.popoverOverlay, mergedClassNames?.overlay),
      }}
    >
      <Popover.Target>{trigger}</Popover.Target>
      <Popover.Dropdown style={popoverVars} {...cmfAttrs}>
        {children}
      </Popover.Dropdown>
    </Popover>
  );
}

export const PopoverWrapper = memo(PopoverWrapperComponent);
PopoverWrapper.displayName = 'PopoverWrapper';
