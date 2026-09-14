import type { InvalidResponseError } from './errors';

export type InvalidResponseSnapshot = {
  status: number;
  message: string;
  snippet: string;
};

let snapshot: InvalidResponseSnapshot | null = null;
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => {
    listener();
  });
}

export function getInvalidResponse(): InvalidResponseSnapshot | null {
  return snapshot;
}

export function subscribeInvalidResponse(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

/** First malformed payload wins — later retries must not replace the page. */
export function reportInvalidResponse(error: InvalidResponseError): void {
  if (snapshot !== null) return;
  snapshot = {
    status: error.status,
    message: error.message,
    snippet: error.snippet,
  };
  emit();
}

export function resetInvalidResponse(): void {
  if (snapshot === null && listeners.size === 0) return;
  snapshot = null;
  emit();
}
