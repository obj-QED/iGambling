import type { LoaderFunctionArgs } from 'react-router-dom';

import { runGetPageNav } from '@api/lobby';
import { queryClient } from '@api/queryClient';
import { resolveAppLanguage } from '@hooks/useLanguage';

import { isLobbyNavigationReady } from '../state/lobbyNavigationGate';

const LOBBY_FREE_PATHS = new Set(['/profile/activation', '/404', '/500']);

function getAppPathname(requestUrl: string): string {
  const pathname = new URL(requestUrl).pathname;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  if (base.length > 0 && (pathname === base || pathname.startsWith(`${base}/`))) {
    return pathname.slice(base.length) || '/';
  }

  return pathname || '/';
}

/**
 * Data-router navigation barrier for backend-driven lobby pages.
 *
 * First route: translation → init only. After bootstrap: the router keeps the
 * current route mounted while this loader awaits `getPage`, then commits the
 * pathname and starts the page-enter animation with real page data.
 */
export async function loadLobbyPage({ request }: LoaderFunctionArgs): Promise<null> {
  const page = getAppPathname(request.url);

  if (LOBBY_FREE_PATHS.has(page)) {
    return null;
  }

  // createBrowserRouter starts loaders before React bootstrap has init data.
  // That pass must never replace init with getPage, including deep links.
  if (!isLobbyNavigationReady()) {
    return null;
  }

  await runGetPageNav({
    language: resolveAppLanguage(),
    page,
    queryClient,
  });

  return null;
}
