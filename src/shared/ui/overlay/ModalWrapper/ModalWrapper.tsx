import type { ModalWrapperProps } from '../types';

import { Children, cloneElement, isValidElement, memo, useState } from 'react';

import { Modal } from '@mantine/core';

import { getModalDefaultProps, mergeOverlayDefaultProps } from '@/shared/config';

/**
 * Trigger + Modal. Cascade: `params.modal` → `defaults` → instance.
 * @see https://mantine.dev/core/modal/?t=props
 */
function ModalWrapperComponent({
  target,
  children,
  opened: openedProp,
  onClose,
  title,
  className,
  defaults: placeDefaults,
  portalTarget,
  'data-cmf-component': dataCmfComponent,
  'data-cmf-key': dataCmfKey,
  'data-cmf-role': dataCmfRole,
  ...modalRest
}: ModalWrapperProps) {
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

  const merged = mergeOverlayDefaultProps(
    mergeOverlayDefaultProps(
      getModalDefaultProps() as Record<string, unknown>,
      (placeDefaults ?? {}) as Record<string, unknown>,
    ),
    {
      ...modalRest,
      ...(title !== undefined ? { title } : {}),
      ...(className !== undefined ? { className } : {}),
      ...(portalTarget != null ? { portalProps: { target: portalTarget } } : {}),
      ...cmfAttrs,
    } as Record<string, unknown>,
  );

  return (
    <>
      {trigger}
      <Modal opened={opened} onClose={close} {...merged}>
        {children}
      </Modal>
    </>
  );
}

export const ModalWrapper = memo(ModalWrapperComponent);
ModalWrapper.displayName = 'ModalWrapper';
