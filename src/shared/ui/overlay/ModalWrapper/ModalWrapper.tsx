import type { OverlayTargetProps } from '../types';

import { Children, cloneElement, isValidElement, memo, useState } from 'react';

import { Modal } from '@mantine/core';

function ModalWrapperComponent({
  target,
  children,
  opened: openedProp,
  onClose,
  title,
  className,
  cmfComponent,
  cmfKey,
  portalTarget,
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
    isValidElement(target) && Children.count(target) === 1 ? (
      cloneElement(target as React.ReactElement<{ onClick?: () => void }>, {
        onClick: () => {
          const prev = (target as React.ReactElement<{ onClick?: () => void }>).props.onClick;
          prev?.();
          open();
        },
      })
    ) : (
      <button type="button" onClick={open}>
        {target}
      </button>
    );

  const cmfAttrs = {
    ...(cmfComponent ? { 'data-cmf-component': cmfComponent } : {}),
    ...(cmfKey ? { 'data-cmf-key': cmfKey } : {}),
  };

  return (
    <>
      {trigger}
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        centered
        className={className}
        portalProps={portalTarget != null ? { target: portalTarget } : undefined}
        {...cmfAttrs}
      >
        {children}
      </Modal>
    </>
  );
}

export const ModalWrapper = memo(ModalWrapperComponent);
ModalWrapper.displayName = 'ModalWrapper';
