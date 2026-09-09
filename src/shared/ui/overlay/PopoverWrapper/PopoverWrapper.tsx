import type { PopoverWrapperProps } from '../types/props.types';

import { Children, cloneElement, isValidElement, memo, useState } from 'react';

import { Popover } from '@mantine/core';
import clsx from 'clsx';

import themeClasses from '@/assets/theme/mantine/styles/components.module.scss';
import { resolvePopoverDropdownVars } from '@/assets/theme/mantine/vars/popoverVars';
import { getPopoverDefaultProps, mergeOverlayDefaultProps } from '@/shared/config';

/**
 * Trigger + Popover. Cascade: `params.popover` → `defaults` → instance.
 * @see https://mantine.dev/core/popover/?t=props
 */
function PopoverWrapperComponent({
  target,
  children,
  opened: openedProp,
  onClose,
  className,
  classNames,
  defaults: placeDefaults,
  portalTarget,
  'data-cmf-component': dataCmfComponent,
  'data-cmf-key': dataCmfKey,
  'data-cmf-role': dataCmfRole,
  ...popoverProps
}: PopoverWrapperProps) {
  const layeredDefaults = mergeOverlayDefaultProps(
    getPopoverDefaultProps() as Record<string, unknown>,
    (placeDefaults ?? {}) as Record<string, unknown>,
  );
  const [uncontrolled, setUncontrolled] = useState(() => layeredDefaults.defaultOpened === true);
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

  const merged = mergeOverlayDefaultProps(layeredDefaults, instanceOverrides);

  const {
    classNames: mergedClassNames,
    className: ignoredClassName,
    defaultOpened: ignoredDefaultOpened,
    onClose: settingsOnClose,
    onOpen: settingsOnOpen,
    onDismiss: settingsOnDismiss,
    onChange: ignoredOnChange,
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
  void ignoredClassName;
  void ignoredDefaultOpened;
  void ignoredOnChange;

  const popoverVars = resolvePopoverDropdownVars({
    ...cmfAttrs,
    radius: restPopover.radius,
    shadow: restPopover.shadow,
  });

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
