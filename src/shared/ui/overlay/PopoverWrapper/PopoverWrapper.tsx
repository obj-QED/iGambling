import type { OverlayTargetProps } from '../types';

import { Children, cloneElement, isValidElement, memo, useState } from 'react';

import { Popover } from '@mantine/core';

function PopoverWrapperComponent({
  target,
  children,
  opened: openedProp,
  onClose,
  className,
}: OverlayTargetProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
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

  return (
    <Popover
      opened={opened}
      onChange={(next) => {
        if (next) {
          open();
        } else {
          close();
        }
      }}
      classNames={{ dropdown: className }}
    >
      <Popover.Target>{trigger}</Popover.Target>
      <Popover.Dropdown>{children}</Popover.Dropdown>
    </Popover>
  );
}

export const PopoverWrapper = memo(PopoverWrapperComponent);
PopoverWrapper.displayName = 'PopoverWrapper';
