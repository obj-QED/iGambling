import type { HeaderProviderItem } from '../types/AppHeader.types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isHeaderProviderItem(value: unknown): value is HeaderProviderItem {
  if (!isRecord(value)) return false;
  return typeof value.name === 'string' && typeof value.icon === 'string' && typeof value.url === 'string';
}

/** Провайдеры шапки из `window.__SETTINGS__.header.providers`. */
export function resolveHeaderProviders(): HeaderProviderItem[] {
  if (typeof globalThis === 'undefined') return [];
  const settings = (globalThis as { __SETTINGS__?: Record<string, unknown> }).__SETTINGS__;
  if (!settings || !isRecord(settings)) return [];
  const header = settings.header;
  if (!isRecord(header)) return [];
  const raw = header.providers;
  if (!Array.isArray(raw)) return [];
  return raw.filter(isHeaderProviderItem);
}
