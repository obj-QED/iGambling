import type { LoaderFunctionArgs } from 'react-router-dom';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { loadLobbyPage } from '@/app/routing/loaders/loadLobbyPage';
import { isLobbyNavigationReady } from '@/app/routing/state/lobbyNavigationGate';
import { runGetPageNav } from '@api/lobby';

vi.mock('@api/lobby', () => ({
  runGetPageNav: vi.fn(),
}));

vi.mock('@api/queryClient', () => ({ queryClient: {} }));

vi.mock('@hooks/useLanguage', () => ({ resolveAppLanguage: () => 'en' }));

vi.mock('@/app/routing/state/lobbyNavigationGate', () => ({ isLobbyNavigationReady: vi.fn() }));

const runGetPageNavMock = vi.mocked(runGetPageNav);
const isLobbyNavigationReadyMock = vi.mocked(isLobbyNavigationReady);

function loaderArgs(path: string): LoaderFunctionArgs {
  return { request: new Request(`https://app.test${path}`) } as LoaderFunctionArgs;
}

describe('loadLobbyPage', () => {
  afterEach(() => {
    runGetPageNavMock.mockReset();
    isLobbyNavigationReadyMock.mockReset();
  });

  it('keeps the first route on its init payload while bootstrap is pending', async () => {
    isLobbyNavigationReadyMock.mockReturnValue(false);

    await expect(loadLobbyPage(loaderArgs('/'))).resolves.toBeNull();

    expect(runGetPageNavMock).not.toHaveBeenCalled();
  });

  it('awaits getPage before committing a later lobby route', async () => {
    isLobbyNavigationReadyMock.mockReturnValue(true);
    runGetPageNavMock.mockResolvedValue(undefined);

    await expect(loadLobbyPage(loaderArgs('/jackpots'))).resolves.toBeNull();

    expect(runGetPageNavMock).toHaveBeenCalledWith(
      expect.objectContaining({ language: 'en', page: '/jackpots' }),
    );
  });

  it('does not request backend page data for application-only routes', async () => {
    await expect(loadLobbyPage(loaderArgs('/signIn'))).resolves.toBeNull();

    expect(runGetPageNavMock).not.toHaveBeenCalled();
  });
});
