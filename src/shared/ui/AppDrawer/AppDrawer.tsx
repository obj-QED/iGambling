import type { AppDrawerProps, AppDrawerViewport } from './types/props.types';
import type { ComponentProps, CSSProperties } from 'react';

import { memo, useEffect, useMemo, useState } from 'react';

import { Drawer } from '@mantine/core';
import clsx from 'clsx';

import themeClasses from '@/assets/theme/mantine/styles/components.module.scss';
import { resolveDrawerRootVars } from '@/assets/theme/mantine/vars/drawerVars';
import { getDrawerDefaultProps, mergeOverlayDefaultProps } from '@/shared/config';

import { readAppDrawerViewport } from './lib/resolveAppDrawerViewport';

import styles from './styles.module.scss';

const DRAWER_RUNTIME_KEYS = new Set([
  'opened',
  'onClose',
  'children',
  'title',
  'className',
  'classNames',
  'defaults',
  'viewport',
  'data-cmf-component',
  'data-cmf-key',
  'data-cmf-role',
]);

const HANDLED_MERGED_KEYS = new Set([
  'position',
  'size',
  'withCloseButton',
  'keepMounted',
  'offset',
  'radius',
  'zIndex',
  'transitionProps',
  'removeScrollProps',
  'closeButtonProps',
  'overlayProps',
]);

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
  keepMounted,
  defaults: defaultsProp,
  viewport: viewportProp,
  className,
  classNames,
  'data-cmf-component': dataCmfComponent,
  'data-cmf-key': dataCmfKey,
  'data-cmf-role': dataCmfRole,
  ...rest
}: AppDrawerProps) {
  const viewport = useDrawerViewport(viewportProp);
  const globalDefaults = getDrawerDefaultProps();

  const merged = mergeOverlayDefaultProps(
    mergeOverlayDefaultProps(
      globalDefaults as Record<string, unknown>,
      (defaultsProp ?? {}) as Record<string, unknown>,
    ),
    {
      ...rest,
      ...(position !== undefined ? { position } : {}),
      ...(size !== undefined ? { size } : {}),
      ...(withCloseButton !== undefined ? { withCloseButton } : {}),
      ...(keepMounted !== undefined ? { keepMounted } : {}),
      ...(title !== undefined ? { title } : {}),
    } as Record<string, unknown>,
  );

  const resolvedPosition = (merged.position as AppDrawerProps['position']) ?? 'right';
  /**
   * Omit `size` unless settings/instance set it — otherwise Mantine paints
   * `--drawer-size-md`. Width then comes from AppDrawer SCSS + theme tokens.
   */
  const resolvedSize = merged.size as AppDrawerProps['size'] | undefined;
  const resolvedWithClose =
    typeof merged.withCloseButton === 'boolean' ? merged.withCloseButton : true;
  const resolvedKeepMounted = typeof merged.keepMounted === 'boolean' ? merged.keepMounted : false;
  const resolvedTitle = title !== undefined ? title : (merged.title as AppDrawerProps['title']);
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
    (resolvedTitle !== undefined && resolvedTitle !== null && resolvedTitle !== false) ||
    resolvedWithClose;

  const cmfAttrs = {
    ...(dataCmfComponent ? { 'data-cmf-component': dataCmfComponent } : {}),
    ...(dataCmfKey ? { 'data-cmf-key': dataCmfKey } : {}),
    ...(dataCmfRole ? { 'data-cmf-role': dataCmfRole } : {}),
  };

  const panelAttrs = {
    'data-viewport': viewport,
    ...cmfAttrs,
  };

  const drawerVars = useMemo(
    () => resolveDrawerRootVars(cmfAttrs) as CSSProperties,
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

  const forwardedRootProps: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(merged)) {
    if (DRAWER_RUNTIME_KEYS.has(key) || HANDLED_MERGED_KEYS.has(key)) continue;
    forwardedRootProps[key] = value;
  }

  return (
    <Drawer.Root
      opened={opened}
      onClose={onClose}
      position={resolvedPosition}
      {...(resolvedSize !== undefined ? { size: resolvedSize } : {})}
      offset={offset}
      radius={radius}
      keepMounted={resolvedKeepMounted}
      zIndex={zIndex}
      transitionProps={transitionProps}
      removeScrollProps={removeScrollProps}
      /* Root gets cmf + vars so Drawer.extend varsResolver nests key tokens. */
      style={drawerVars}
      {...cmfAttrs}
      classNames={{
        content: contentClass,
        header: headerClass,
        title: titleClass,
        close: closeClass,
        body: bodyClass,
        overlay: overlayClass,
      }}
      {...forwardedRootProps}
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
            {resolvedTitle !== undefined && resolvedTitle !== null && resolvedTitle !== false && (
              <Drawer.Title className={titleClass}>{resolvedTitle}</Drawer.Title>
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
