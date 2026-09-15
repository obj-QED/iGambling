import { collectKnownMenuPaths } from './collectKnownMenuPaths';
import { EXTRA_KNOWN_APP_PATH_SET, isExtraKnownAppPath } from './specialAppPaths';

type Listener = () => void;

/** Accumulated allowlist — merged from every initV2 / getPage `page` payload. */
let knownPaths = new Set<string>(['/', ...EXTRA_KNOWN_APP_PATH_SET]);
let version = 0;
const listeners = new Set<Listener>();

function emit(): void {
  version += 1;
  for (const listener of listeners) listener();
}

export function getKnownAppPathsSnapshot(): ReadonlySet<string> {
  return knownPaths;
}

/** Version bump on merge — safe `useSyncExternalStore` snapshot (Set identity is stable). */
export function getKnownAppPathsVersion(): number {
  return version;
}

export function subscribeKnownAppPaths(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Merge menu URLs from a page payload (init or getPage). Never shrinks the set. */
export function mergeKnownAppPathsFromPage(page: unknown): void {
  const next = collectKnownMenuPaths(page);
  let changed = false;
  for (const path of next) {
    if (!knownPaths.has(path)) {
      knownPaths.add(path);
      changed = true;
    }
  }
  if (changed) emit();
}

/** Test helper — reset between cases. */
export function resetKnownAppPathsForTests(): void {
  knownPaths = new Set<string>(['/', ...EXTRA_KNOWN_APP_PATH_SET]);
  emit();
}

export function isKnownAppPath(pathname: string): boolean {
  const normalized = pathname.length > 0 ? pathname : '/';
  const trimmed =
    normalized.length > 1 && normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
  return knownPaths.has(trimmed) || isExtraKnownAppPath(trimmed);
}
