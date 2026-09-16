import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { InfoPage } from '@/pages/Info/InfoPage';

type GetPageState = {
  data: { url?: string; info?: { title?: string; content?: string } } | undefined;
  loading: boolean;
  error: unknown;
};

const pageState = vi.hoisted(() => ({
  current: {
    data: undefined,
    loading: false,
    error: null,
  } as GetPageState,
  pathname: '/terms',
}));

vi.mock('@api/lobby/queries/useGetPage', () => ({
  useGetPage: () => pageState.current,
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

describe('InfoPage API-driven routing', () => {
  beforeEach(() => {
    pageState.pathname = '/terms';
    pageState.current = {
      data: undefined,
      loading: false,
      error: null,
    };
  });

  it('shows loading while getPage for this path is in flight', () => {
    pageState.current = {
      ...pageState.current,
      data: undefined,
      loading: true,
    };
    renderInfo('/terms');
    expect(document.querySelector('[data-page-kind="loading"]')).toBeTruthy();
    expect(screen.queryByText('not-found')).not.toBeInTheDocument();
  });

  it('renders CMS from API even when path was never in a menu allowlist', () => {
    pageState.pathname = '/jackpots';
    pageState.current = {
      ...pageState.current,
      data: { url: '/jackpots', info: { title: 'Jackpots', content: '<p>hi</p>' } },
      loading: false,
    };
    renderInfo('/jackpots');
    expect(screen.queryByText('not-found')).not.toBeInTheDocument();
    expect(screen.getByText('Jackpots')).toBeInTheDocument();
    expect(document.querySelector('[data-page-kind="info"]')).toBeTruthy();
  });

  it('keeps lobby shell for API page without page.info (deep-link /jackpots)', () => {
    pageState.pathname = '/jackpots';
    pageState.current = {
      ...pageState.current,
      data: { url: '/jackpots' },
      loading: false,
    };
    renderInfo('/jackpots');
    expect(screen.queryByText('not-found')).not.toBeInTheDocument();
    expect(document.querySelector('[data-page-kind="lobby"]')).toBeTruthy();
  });

  it('keeps lobby shell when info fields are all empty strings', () => {
    pageState.pathname = '/tournaments';
    pageState.current = {
      ...pageState.current,
      data: {
        url: '/tournaments',
        info: { title: '', description: '', name: '', content: '' },
      },
      loading: false,
    };
    renderInfo('/tournaments');
    expect(screen.queryByText('not-found')).not.toBeInTheDocument();
    expect(document.querySelector('[data-page-kind="lobby"]')).toBeTruthy();
  });

  it('navigates to /404 when settled with no page payload', () => {
    pageState.pathname = '/ghost';
    pageState.current = {
      data: undefined,
      loading: false,
      error: null,
    };
    renderInfo('/ghost');
    expect(screen.getByText('not-found')).toBeInTheDocument();
  });

  it('navigates to /404 when getPage errors and there is no page data', () => {
    pageState.pathname = '/broken';
    pageState.current = {
      data: undefined,
      loading: false,
      error: new Error('getPage failed'),
    };
    renderInfo('/broken');
    expect(screen.getByText('not-found')).toBeInTheDocument();
  });
});
