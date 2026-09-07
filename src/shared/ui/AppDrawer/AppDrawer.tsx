import type { AppDrawerProps, AppDrawerViewport } from './types/props.types';
import type { ComponentProps } from 'react';

import { memo, useEffect, useMemo, useState } from 'react';

import { Drawer } from '@mantine/core';
import clsx from 'clsx';

import themeClasses from '@/assets/theme/mantine/styles/components.module.scss';
import { resolveDrawerRootVars } from '@/assets/theme/mantine/vars/drawerVars';
import { getDrawerDefaultProps, mergeOverlayDefaultProps } from '@/shared/config';

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
  position,
  size,
  withCloseButton,
  keepMounted = false,
  viewport: viewportProp,
  className,
  classNames,
  'data-cmf-component': dataCmfComponent,
  'data-cmf-key': dataCmfKey,
  'data-cmf-role': dataCmfRole,
}: AppDrawerProps) {
  const viewport = useDrawerViewport(viewportProp);
  const defaults = getDrawerDefaultProps();

  const merged = mergeOverlayDefaultProps(
    defaults as Record<string, unknown>,
    {
      ...(position !== undefined ? { position } : {}),
      ...(size !== undefined ? { size } : {}),
      ...(withCloseButton !== undefined ? { withCloseButton } : {}),
    } as Record<string, unknown>,
  );

  const resolvedPosition = (merged.position as AppDrawerProps['position']) ?? 'right';
  const resolvedSize = merged.size as AppDrawerProps['size'];
  const resolvedWithClose =
    typeof merged.withCloseButton === 'boolean' ? merged.withCloseButton : true;
  const closeButtonProps = merged.closeButtonProps as
    ComponentProps<typeof Drawer.CloseButton> | undefined;
  const overlayProps = merged.overlayProps as Record<string, unknown> | undefined;
  const transitionProps = merged.transitionProps as Record<string, unknown> | undefined;
  const removeScrollProps = merged.removeScrollProps as Record<string, unknown> | undefined;
  const offset = merged.offset as string | number | undefined;
  const radius = merged.radius as string | number | undefined;
  const zIndex =
    (merged.zIndex as string | number | undefined) ??
    'var(--drawer-z-index, var(--z-index-modal, 500))';

  const showHeader =
    (title !== undefined && title !== null && title !== false) || resolvedWithClose;

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
  const titleClass = clsx(themeClasses.drawerTitle, classNames?.title) || undefined;
  const closeClass = clsx(themeClasses.drawerClose, classNames?.close) || undefined;
  const bodyClass = clsx(styles.body, themeClasses.drawerBody, classNames?.body) || undefined;
  const overlayClass = clsx(themeClasses.drawerOverlay, classNames?.overlay);

  return (
    <Drawer.Root
      opened={opened}
      onClose={onClose}
      position={resolvedPosition}
      size={resolvedSize}
      offset={offset}
      radius={radius}
      keepMounted={keepMounted}
      zIndex={zIndex}
      transitionProps={transitionProps}
      removeScrollProps={removeScrollProps}
      classNames={{
        content: contentClass,
        header: headerClass,
        title: titleClass,
        close: closeClass,
        body: bodyClass,
        overlay: overlayClass,
      }}
    >
      {/* Overlay is a sibling of Content — same data-* + paint vars for scrim. */}
      <Drawer.Overlay
        className={overlayClass}
        style={drawerVars}
        {...overlayProps}
        {...panelAttrs}
      />
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
              <Drawer.Title className={titleClass}>{title}</Drawer.Title>
            )}
            {resolvedWithClose && (
              <Drawer.CloseButton className={closeClass} {...closeButtonProps} />
            )}
          </Drawer.Header>
        )}
        <Drawer.Body className={bodyClass}>{children}</Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

export const AppDrawer = memo(AppDrawerComponent);
AppDrawer.displayName = 'AppDrawer';
