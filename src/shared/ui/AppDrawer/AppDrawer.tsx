import type { AppDrawerProps, AppDrawerViewport } from './types/props.types';

import { memo, useEffect, useState } from 'react';

import { Drawer } from '@mantine/core';

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
  cmfComponent,
  cmfKey,
  className,
  classNames,
}: AppDrawerProps) {
  const viewport = useDrawerViewport(viewportProp);
  const showHeader = (title !== undefined && title !== null && title !== false) || withCloseButton;

  const innerClass = [styles.inner, classNames?.inner].filter(Boolean).join(' ') || undefined;
  // Prefer classNames.content — Content's `className` is also forwarded onto `inner` by Mantine.
  const contentClass =
    [styles.content, className, classNames?.content].filter(Boolean).join(' ') ||
    undefined;

  const panelAttrs = {
    'data-viewport': viewport,
    ...(cmfComponent && { 'data-cmf-component': cmfComponent }),
    ...(cmfKey && { 'data-cmf-key': cmfKey }),
  };

  return (
    <Drawer.Root
      opened={opened}
      onClose={onClose}
      position={position}
      size={size}
      keepMounted={keepMounted}
      zIndex="var(--drawer-z-index, var(--z-index-modal, 500))"
      classNames={{
        // `inner` belongs on Content (DrawerContentStylesNames), not Root.
        content: contentClass,
        header: classNames?.header,
        body: classNames?.body,
        overlay: classNames?.overlay,
      }}
    >
      {/* Overlay is a sibling of Content — same data-* for scrim + viewport tokens. */}
      <Drawer.Overlay
        className={[styles.overlay, classNames?.overlay].filter(Boolean).join(' ')}
        {...panelAttrs}
      />
      <Drawer.Content
        classNames={{
          inner: innerClass,
          content: contentClass,
        }}
        {...panelAttrs}
      >
        {showHeader && (
          <Drawer.Header className={classNames?.header}>
            {title !== undefined && title !== null && title !== false && (
              <Drawer.Title className={classNames?.title}>{title}</Drawer.Title>
            )}
            {withCloseButton && <Drawer.CloseButton />}
          </Drawer.Header>
        )}
        <Drawer.Body className={[styles.body, classNames?.body].filter(Boolean).join(' ')}>
          {children}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

export const AppDrawer = memo(AppDrawerComponent);
AppDrawer.displayName = 'AppDrawer';
