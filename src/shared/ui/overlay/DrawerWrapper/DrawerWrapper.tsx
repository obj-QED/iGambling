import type { DrawerWrapperProps } from '../types';

import { Children, cloneElement, isValidElement, memo, useState } from 'react';

import { AppDrawer } from '@/shared/ui/AppDrawer';

/**
 * Trigger + AppDrawer. Cascade: `params.drawer` → `defaults` (place) → instance props.
 * @see https://mantine.dev/core/drawer/?t=props
 */
function DrawerWrapperComponent({
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
  ...drawerProps
}: DrawerWrapperProps) {
  // Reserved for portal host; strip from Mantine drawer props.
  void portalTarget;

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

  return (
    <>
      {trigger}
      <AppDrawer
        opened={opened}
        onClose={close}
        defaults={placeDefaults}
        title={title}
        className={className}
        {...drawerProps}
        {...cmfAttrs}
      >
        {children}
      </AppDrawer>
    </>
  );
}

export const DrawerWrapper = memo(DrawerWrapperComponent);
DrawerWrapper.displayName = 'DrawerWrapper';
