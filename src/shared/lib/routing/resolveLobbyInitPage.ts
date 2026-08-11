/** SPA shell routes that are not lobby `initV2` pages — bootstrap with `/` instead. */
const LOBBY_INIT_FALLBACK_PATHS = new Set([
  '/auth',
  '/register',
  '/profile/activation',
  '/404',
  '/500',
]);

/**
 * Path passed to lobby `initV2` / menu bootstrap.
 * Deep SPA shells (auth, activation, error pages) must not block the app when the
 * backend has no page payload for them.
 */
export function resolveLobbyInitPage(pathname: string): string {
  const path = pathname.length > 0 ? pathname : '/';
  if (LOBBY_INIT_FALLBACK_PATHS.has(path)) return '/';
  return path;
}
