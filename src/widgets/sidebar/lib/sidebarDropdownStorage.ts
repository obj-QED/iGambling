const STORAGE_KEY = 'igambling:sidebar:dropdown-open-keys';

/** Persisted open keys; `null` in storage → seed from `defaultOpenKeys` (first visit). */
export function readSidebarDropdownOpenKeys(
  defaultOpenKeys: readonly string[] = [],
): ReadonlySet<string> {
  if (typeof window === 'undefined') return new Set(defaultOpenKeys);

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return new Set(defaultOpenKeys);

    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) === false) return new Set(defaultOpenKeys);

    return new Set(
      parsed.filter((key): key is string => typeof key === 'string' && key.length > 0),
    );
  } catch {
    return new Set(defaultOpenKeys);
  }
}

export function writeSidebarDropdownOpenKeys(keys: ReadonlySet<string>): void {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...keys]));
}

export function toggleSidebarDropdownOpenKey(
  keys: ReadonlySet<string>,
  menuKey: string,
): ReadonlySet<string> {
  const next = new Set(keys);
  if (next.has(menuKey)) {
    next.delete(menuKey);
  } else {
    next.add(menuKey);
  }
  return next;
}
