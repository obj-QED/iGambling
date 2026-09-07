import type { DrawerProps, ModalProps } from '@mantine/core';

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

const STRIP_KEYS = new Set(['opened', 'onClose', 'children']);

const NESTED_PROP_KEYS = [
  'overlayProps',
  'transitionProps',
  'closeButtonProps',
  'removeScrollProps',
  'portalProps',
] as const;

function readOverlaySettings(raw: unknown): Record<string, unknown> {
  if (!isRecord(raw)) return {};
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (STRIP_KEYS.has(key)) continue;
    out[key] = value;
  }
  return out;
}

/** Safe `params.modal` → Mantine Modal default props. */
export function getModalDefaultProps(settings = getSettings()): ModalSettings {
  return readOverlaySettings(settings.params?.modal) as ModalSettings;
}

/** Safe `params.drawer` → Mantine Drawer default props. */
export function getDrawerDefaultProps(settings = getSettings()): DrawerSettings {
  return readOverlaySettings(settings.params?.drawer) as DrawerSettings;
}

/**
 * Merge settings defaults with instance props (instance wins).
 * Nested `overlayProps` / `transitionProps` / `closeButtonProps` / … are shallow-merged.
 */
export function mergeOverlayDefaultProps<T extends Record<string, unknown>>(
  defaults: T,
  overrides: T,
): T {
  const out = { ...defaults, ...overrides } as T;

  for (const key of NESTED_PROP_KEYS) {
    const base = defaults[key as keyof T];
    const next = overrides[key as keyof T];
    if (!isRecord(base) && !isRecord(next)) continue;
    (out as Record<string, unknown>)[key] = {
      ...(isRecord(base) ? base : {}),
      ...(isRecord(next) ? next : {}),
    };
  }

  return out;
}
