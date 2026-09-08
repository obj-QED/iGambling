import type { DrawerProps, MenuProps, ModalProps, PopoverProps } from '@mantine/core';

import { isRecord } from '@/shared/lib/coercion';

import { getSettings } from './settings';

/**
 * Global Modal tunables from `params.modal` (`window.__SETTINGS__`).
 * Any Mantine Modal prop except runtime-owned (`opened` / `onClose` / `children`).
 * @see https://mantine.dev/core/modal/?t=props
 */
export type ModalSettings = Omit<Partial<ModalProps>, 'opened' | 'onClose' | 'children'>;

/**
 * Global Drawer tunables from `params.drawer`.
 * Any Mantine Drawer prop except runtime-owned (`opened` / `onClose` / `children`).
 * @see https://mantine.dev/core/drawer/?t=props
 */
export type DrawerSettings = Omit<Partial<DrawerProps>, 'opened' | 'onClose' | 'children'>;

/**
 * Global Popover tunables from `params.popover`.
 * Any Mantine Popover prop except runtime-owned (`opened` / `onChange` / `children`).
 * Callbacks like `onClose` / `onOpen` / `onDismiss` are allowed.
 * @see https://mantine.dev/core/popover/?t=props
 */
export type PopoverSettings = Omit<Partial<PopoverProps>, 'opened' | 'onChange' | 'children'>;

/**
 * Global / header Menu tunables from `params.menu` / `header.menu`.
 * Any Mantine Menu prop except runtime-owned (`opened` / `onChange` / `children`).
 * @see https://mantine.dev/core/menu/?t=props
 */
export type MenuSettings = Omit<Partial<MenuProps>, 'opened' | 'onChange' | 'children'>;

const MODAL_DRAWER_STRIP = new Set(['opened', 'onClose', 'children']);
const POPOVER_MENU_STRIP = new Set(['opened', 'onChange', 'children']);

const NESTED_PROP_KEYS = [
  'overlayProps',
  'transitionProps',
  'closeButtonProps',
  'removeScrollProps',
  'portalProps',
  'middlewares',
] as const;

function readOverlaySettings(raw: unknown, strip: ReadonlySet<string>): Record<string, unknown> {
  if (!isRecord(raw)) return {};
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (strip.has(key)) continue;
    out[key] = value;
  }
  return out;
}

/** Safe `params.modal` → Mantine Modal default props. */
export function getModalDefaultProps(settings = getSettings()): ModalSettings {
  return readOverlaySettings(settings.params?.modal, MODAL_DRAWER_STRIP) as ModalSettings;
}

/** Safe `params.drawer` → Mantine Drawer default props. */
export function getDrawerDefaultProps(settings = getSettings()): DrawerSettings {
  return readOverlaySettings(settings.params?.drawer, MODAL_DRAWER_STRIP) as DrawerSettings;
}

/** Safe `params.popover` → Mantine Popover default props. */
export function getPopoverDefaultProps(settings = getSettings()): PopoverSettings {
  return readOverlaySettings(settings.params?.popover, POPOVER_MENU_STRIP) as PopoverSettings;
}

/** Safe `params.menu` → Mantine Menu default props. */
export function getMenuDefaultProps(settings = getSettings()): MenuSettings {
  return readOverlaySettings(settings.params?.menu, POPOVER_MENU_STRIP) as MenuSettings;
}

/**
 * Merge settings defaults with instance props (instance wins).
 * `undefined` overrides are skipped so they do not wipe settings (e.g. `title`).
 * Nested `overlayProps` / `transitionProps` / `middlewares` / … are shallow-merged.
 */
export function mergeOverlayDefaultProps<T extends Record<string, unknown>>(
  defaults: T,
  overrides: T,
): T {
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(overrides)) {
    if (value !== undefined) cleaned[key] = value;
  }

  const out = { ...defaults, ...cleaned } as T;

  for (const key of NESTED_PROP_KEYS) {
    const base = defaults[key as keyof T];
    const next = cleaned[key];
    if (!isRecord(base) && !isRecord(next)) continue;
    (out as Record<string, unknown>)[key] = {
      ...(isRecord(base) ? base : {}),
      ...(isRecord(next) ? next : {}),
    };
  }

  return out;
}
