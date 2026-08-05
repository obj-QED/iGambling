/**
 * Resolve a file under Vite `public/` or the remote app origin.
 *
 * - Absolute `http(s):` → unchanged
 * - `icons/**` (and other local public files) → Vite `BASE_URL` (same-origin; required for
 *   `react-inlinesvg` — cross-origin SVG fetch is blocked by CORS)
 * - `uploads/**` / `images/**` when `VITE_APP_URL` is set → `{VITE_APP_URL}/…` (CDN / API media)
 * - else → `BASE_URL` (Storybook `base: '/iGambling/'`, local `/`)
 *
 * Restart `yarn dev` after changing `.env.local` — Vite bakes env at startup.
 */
export function publicAssetUrl(path: string): string {
  const raw = String(path).trim();
  if (raw.length === 0) return '';
  if (/^https?:\/\//i.test(raw) || raw.startsWith('//')) return raw;

  const clean = raw.replace(/^\/+/, '').replace(/^public\//, '');
  const appUrl = String(import.meta.env.VITE_APP_URL ?? '')
    .trim()
    .replace(/\/+$/, '');

  const useRemoteOrigin =
    appUrl.length > 0 && /^(uploads|images)\//i.test(clean) && !/\.svg(?:$|\?)/i.test(clean);

  if (useRemoteOrigin) {
    return `${appUrl}/${clean}`;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${clean}`;
}
