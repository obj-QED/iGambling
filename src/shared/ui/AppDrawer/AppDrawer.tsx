import type { AppDrawerProps, AppDrawerViewport } from './types/props.types';

import { memo, useEffect, useMemo, useState } from 'react';

import { Drawer } from '@mantine/core';
import clsx from 'clsx';

import themeClasses from '@/assets/theme/mantine/styles/components.module.scss';
import { resolveDrawerRootVars } from '@/assets/theme/mantine/vars/drawerVars';

import { readAppDrawerViewport } from './lib/resolveAppDrawerViewport';

import styles from './styles.module.scss';

function useDrawerViewport(override: AppDrawerViewport | undefined): AppDrawerViewport {
  const [viewport, setViewport] = useState(readAppDrawerViewport);

  useEffect(() => {
    if (override !== undefined) {
      return undefined;
    }

    const sync = (): void => {
      setViewport(readAppDrawerViewport());
    };

    sync();
    window.addEventListener('resize', sync);
    return () => {
      window.removeEventListener('resize', sync);
    };
  }, [override]);

  return override ?? viewport;
}

function AppDrawerComponent({
  opened,
  onClose,
  children,
  title,
  position = 'right',
  size,
  withCloseButton = true,
  keepMounted = false,
  viewport: viewportProp,
  className,
  classNames,
  'data-cmf-component': dataCmfComponent,
  'data-cmf-key': dataCmfKey,
  'data-cmf-role': dataCmfRole,
}: AppDrawerProps) {
  const viewport = useDrawerViewport(viewportProp);
  const showHeader = (title !== undefined && title !== null && title !== false) || withCloseButton;

  const panelAttrs = {
    'data-viewport': viewport,
    ...(dataCmfComponent ? { 'data-cmf-component': dataCmfComponent } : {}),
    ...(dataCmfKey ? { 'data-cmf-key': dataCmfKey } : {}),
    ...(dataCmfRole ? { 'data-cmf-role': dataCmfRole } : {}),
  };

  const drawerVars = useMemo(
    () =>
      resolveDrawerRootVars({
        ...(dataCmfComponent ? { 'data-cmf-component': dataCmfComponent } : {}),
        ...(dataCmfKey ? { 'data-cmf-key': dataCmfKey } : {}),
        ...(dataCmfRole ? { 'data-cmf-role': dataCmfRole } : {}),
      }),
    [dataCmfComponent, dataCmfKey, dataCmfRole],
  );

  const innerClass = clsx(styles.inner, classNames?.inner) || undefined;
  const contentClass =
    clsx(styles.content, themeClasses.drawerContent, className, classNames?.content) || undefined;
  const headerClass = clsx(themeClasses.drawerHeader, classNames?.header) || undefined;
  const bodyClass = clsx(styles.body, themeClasses.drawerBody, classNames?.body) || undefined;
  const overlayClass = clsx(themeClasses.drawerOverlay, classNames?.overlay);

  return (
    <Drawer.Root
      opened={opened}
      onClose={onClose}
      position={position}
      size={size}
      keepMounted={keepMounted}
      zIndex="var(--drawer-z-index, var(--z-index-modal, 500))"
      classNames={{
        content: contentClass,
        header: headerClass,
        body: bodyClass,
        overlay: overlayClass,
      }}
    >
      {/* Overlay is a sibling of Content — same data-* + paint vars for scrim. */}
      <Drawer.Overlay className={overlayClass} style={drawerVars} {...panelAttrs} />
      <Drawer.Content
        classNames={{
          inner: innerClass,
          content: contentClass,
        }}
        style={drawerVars}
        {...panelAttrs}
      >
        {showHeader && (
          <Drawer.Header className={headerClass}>
            {title !== undefined && title !== null && title !== false && (
              <Drawer.Title className={classNames?.title}>{title}</Drawer.Title>
            )}
            {withCloseButton && <Drawer.CloseButton />}
          </Drawer.Header>
        )}
        <Drawer.Body className={bodyClass}>{children}</Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

export const AppDrawer = memo(AppDrawerComponent);
AppDrawer.displayName = 'AppDrawer';
