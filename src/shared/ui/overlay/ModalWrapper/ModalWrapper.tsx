import type { OverlayTargetProps } from '../types';

import { Children, cloneElement, isValidElement, memo, useState } from 'react';

import { Modal } from '@mantine/core';

import { getModalDefaultProps, mergeOverlayDefaultProps } from '@/shared/config';

function ModalWrapperComponent({
  target,
  children,
  opened: openedProp,
  onClose,
  title,
  className,
  portalTarget,
  'data-cmf-component': dataCmfComponent,
  'data-cmf-key': dataCmfKey,
  'data-cmf-role': dataCmfRole,
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
    ...(dataCmfComponent ? { 'data-cmf-component': dataCmfComponent } : {}),
    ...(dataCmfKey ? { 'data-cmf-key': dataCmfKey } : {}),
    ...(dataCmfRole ? { 'data-cmf-role': dataCmfRole } : {}),
  };

  const defaults = getModalDefaultProps();
  const instance = {
    title,
    className,
    ...(portalTarget != null ? { portalProps: { target: portalTarget } } : {}),
    ...cmfAttrs,
  };
  const modalProps = mergeOverlayDefaultProps(
    defaults as Record<string, unknown>,
    instance as Record<string, unknown>,
  );

  return (
    <>
      {trigger}
      <Modal opened={opened} onClose={close} {...modalProps}>
        {children}
      </Modal>
    </>
  );
}

export const ModalWrapper = memo(ModalWrapperComponent);
ModalWrapper.displayName = 'ModalWrapper';
