function readAllowedOrigins(): Set<string> {
  const origins = new Set<string>();
  if (typeof window !== 'undefined' && window.location?.origin) {
    origins.add(window.location.origin);
  }
  for (const raw of [import.meta.env.VITE_APP_URL, import.meta.env.VITE_LOBBY_API_URL]) {
    if (typeof raw !== 'string' || raw.trim() === '') continue;
    try {
      origins.add(new URL(raw).origin);
    } catch {
      /* ignore invalid env */
    }
  }
  return origins;
}

/**
 * Block SSRF / open-proxy: only relative paths or allowlisted API origins
 * (`window.location`, `VITE_APP_URL`, `VITE_LOBBY_API_URL`).
 */
export function assertSafeRequestUrl(url: string | undefined, baseURL = ''): void {
  if (url == null || url.trim() === '') return;

  const trimmed = url.trim();

  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return;

  if (trimmed.startsWith('//')) {
    throw new Error('[security] Protocol-relative URLs are not allowed');
  }

  let absolute: URL;
  try {
    const fallback = typeof window !== 'undefined' ? window.location.href : 'http://localhost/';
    absolute = new URL(trimmed, baseURL || fallback);
  } catch {
    throw new Error('[security] Invalid request URL');
  }

  if (absolute.protocol !== 'http:' && absolute.protocol !== 'https:') {
    throw new Error('[security] Only http(s) URLs are allowed');
  }

  const allowed = readAllowedOrigins();
  if (allowed.size === 0) return;
  if (!allowed.has(absolute.origin)) {
    throw new Error(`[security] Cross-origin request blocked: ${absolute.origin}`);
  }
}
