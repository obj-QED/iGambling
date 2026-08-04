/**
 * Resolve a file under Vite `public/` with the active `base`.
 * Storybook uses `base: '/iGambling/'` — bare `/uploads/...` 404s there.
 */
export function publicAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const clean = path.replace(/^\/+/, '');
  return `${normalizedBase}${clean}`;
}
