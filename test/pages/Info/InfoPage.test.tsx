import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  mergeKnownAppPathsFromPage,
  resetKnownAppPathsForTests,
} from '@/api/lobby/lib/knownAppPathsStore';
import { mantineTheme } from '@/assets/theme';
import { InfoPage } from '@/pages/Info/InfoPage';

type PageState = {
  data: { url?: string; info?: { title?: string; content?: string } } | undefined;
  loading: boolean;
  isFetching: boolean;
  isPlaceholderData: boolean;
  isSettled: boolean;
  error: unknown;
};

const pageState = vi.hoisted(() => ({
  current: {
    data: undefined,
    loading: false,
    isFetching: false,
    isPlaceholderData: false,
    isSettled: false,
    error: null,
  } as PageState,
  pathname: '/terms',
}));

vi.mock('@api/lobby/queries/useCurrentPageData', () => ({
  useCurrentPageDataState: () => pageState.current,
}));

vi.mock('@hooks/useLanguage', () => ({
  useLanguage: () => 'en',
}));

vi.mock('@/shared/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/hooks')>();
  return {
    ...actual,
    usePathname: () => pageState.pathname,
  };
});

function renderInfo(entry = '/terms') {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route path="*" element={<InfoPage />} />
          <Route path="/404" element={<div>not-found</div>} />
        </Routes>
      </MemoryRouter>
    </MantineProvider>,
  );
}

describe('InfoPage menu allowlist + page.info', () => {
  beforeEach(() => {
    resetKnownAppPathsForTests();
    pageState.pathname = '/terms';
    pageState.current = {
      data: undefined,
      loading: false,
      isFetching: false,
      isPlaceholderData: false,
      isSettled: false,
      error: null,
    };
  });

  it('shows loading while getPage for this path is in flight', () => {
    mergeKnownAppPathsFromPage({
      menu: [{ url: '/terms', key: 'terms' }],
    });
    pageState.current = {
      data: undefined,
      loading: true,
      isFetching: true,
      isPlaceholderData: true,
      isSettled: false,
      error: null,
    };
    renderInfo('/terms');
    expect(document.querySelector('[data-page-kind="loading"]')).toBeTruthy();
    expect(screen.queryByText('not-found')).not.toBeInTheDocument();
  });

  it('navigates to /404 when path is not in menu allowlist', () => {
    mergeKnownAppPathsFromPage({
      menu: [{ url: '/terms', key: 'terms' }],
    });
    pageState.pathname = '/not-a-real-page';
    pageState.current = {
      data: {
        url: '/not-a-real-page',
        info: { title: 'X', content: '<p>x</p>' },
      },
      loading: false,
      isFetching: false,
      isPlaceholderData: false,
      isSettled: true,
      error: null,
    };
    renderInfo('/not-a-real-page');
    expect(screen.getByText('not-found')).toBeInTheDocument();
  });

  it('keeps lobby shell for sidebar-known path without page.info', () => {
    mergeKnownAppPathsFromPage({
      menu: [{ url: '/jackpots', key: 'jackpots' }],
    });
    pageState.pathname = '/jackpots';
    pageState.current = {
      data: { url: '/jackpots' },
      loading: false,
      isFetching: false,
      isPlaceholderData: false,
      isSettled: true,
      error: null,
    };
    renderInfo('/jackpots');
    expect(screen.queryByText('not-found')).not.toBeInTheDocument();
    expect(document.querySelector('[data-page-kind="lobby"]')).toBeTruthy();
  });

  it('keeps lobby shell when info fields are all empty strings', () => {
    mergeKnownAppPathsFromPage({
      menu: [{ url: '/tournaments', key: 'tournaments' }],
    });
    pageState.pathname = '/tournaments';
    pageState.current = {
      data: {
        url: '/tournaments',
        info: { title: '', description: '', name: '', content: '' },
      },
      loading: false,
      isFetching: false,
      isPlaceholderData: false,
      isSettled: true,
      error: null,
    };
    renderInfo('/tournaments');
    expect(screen.queryByText('not-found')).not.toBeInTheDocument();
    expect(document.querySelector('[data-page-kind="lobby"]')).toBeTruthy();
  });

  it('renders CMS when title is set', () => {
    mergeKnownAppPathsFromPage({
      menu: [{ url: '/jackpots', key: 'jackpots' }],
    });
    pageState.pathname = '/jackpots';
    pageState.current = {
      data: { url: '/jackpots', info: { title: 'Jackpots', content: '' } },
      loading: false,
      isFetching: false,
      isPlaceholderData: false,
      isSettled: true,
      error: null,
    };
    renderInfo('/jackpots');
    expect(screen.queryByText('not-found')).not.toBeInTheDocument();
    expect(screen.getByText('Jackpots')).toBeInTheDocument();
  });
});
