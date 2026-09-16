type Listener = () => void;

/** After the first SPA navigation away from the entry path, page data comes from getPage. */
let leftEntryPath = false;
let version = 0;
const listeners = new Set<Listener>();

function emit(): void {
  version += 1;
  for (const listener of listeners) listener();
}

export function hasLeftEntryPath(): boolean {
  return leftEntryPath;
}

export function getEntryPathGateVersion(): number {
  return version;
}

export function subscribeEntryPathGate(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function markLeftEntryPath(): void {
  if (leftEntryPath) return;
  leftEntryPath = true;
  emit();
}

/** Test helper. */
export function resetEntryPathGateForTests(): void {
  leftEntryPath = false;
  version += 1;
  emit();
}
