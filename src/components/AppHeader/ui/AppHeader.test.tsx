import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { AppHeader } from './AppHeader';
import { AppHeaderContainerLayout } from './layouts/AppHeaderContainerLayout';

const mockUseCurrentPageDataState = vi.fn();
const mockUseLanguage = vi.fn(() => 'ru');
const mockUseLocation = vi.fn(() => ({ pathname: '/' }));
const mockUseAuthSession = vi.fn(() => ({ isAuthenticated: false }));

vi.mock('@/api/lobby', () => ({
  useCurrentPageDataState: () => mockUseCurrentPageDataState(),
}));

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => mockUseLanguage(),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useLocation: () => mockUseLocation(),
  };
});

vi.mock('@/hooks/useAuthSession', () => ({
  useAuthSession: () => mockUseAuthSession(),
}));

const MENU_HEADER_BLOCK = {
  blocks: [
    {
      buttonSearch: '1',
      type: 'menuHeaderTop',
      menu: [
        { url: '', name: 'logo', key: 'logo', img: '/logo.png' },
        { url: '/games', name: 'slots', key: 'slots', img: '' },
      ],
    },
  ],
};

function renderWithRouter(ui: Parameters<typeof render>[0]) {
  return render(
    <MantineProvider>
      <MemoryRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        {ui}
      </MemoryRouter>
    </MantineProvider>,
  );
}

describe('AppHeader', () => {
  it('renders menu items from menuHeaderTop block', () => {
    mockUseCurrentPageDataState.mockReturnValue({
      data: MENU_HEADER_BLOCK,
      loading: false,
      isFetching: false,
      error: null,
    });
    renderWithRouter(<AppHeader />);

    expect(screen.getByText('logo')).toBeInTheDocument();
    expect(screen.getByText('slots')).toBeInTheDocument();
  });

  it('shows skeleton while loading and no data', () => {
    mockUseCurrentPageDataState.mockReturnValue({
      data: undefined,
      loading: true,
      isFetching: true,
      error: null,
    });
    renderWithRouter(<AppHeader />);

    expect(screen.getByTestId('app-header-skeleton')).toBeInTheDocument();
  });

  it('does not show skeleton when data is available', () => {
    mockUseCurrentPageDataState.mockReturnValue({
      data: MENU_HEADER_BLOCK,
      loading: false,
      isFetching: false,
      error: null,
    });
    renderWithRouter(<AppHeader />);

    expect(screen.queryByTestId('app-header-skeleton')).not.toBeInTheDocument();
  });

  it('does not render undefined class for container layout', () => {
    const { container } = renderWithRouter(<AppHeaderContainerLayout>content</AppHeaderContainerLayout>);

    expect(container.innerHTML).toContain('header-container');
    expect(container.innerHTML).not.toContain('undefined');
  });
});
