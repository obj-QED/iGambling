import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AppHeader } from './AppHeader';

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

vi.mock('react-router-dom', () => ({
  useLocation: () => mockUseLocation(),
}));

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

describe('AppHeader', () => {
  it('renders menu items from menuHeaderTop block', () => {
    mockUseCurrentPageDataState.mockReturnValue({
      data: MENU_HEADER_BLOCK,
      loading: false,
      isFetching: false,
      error: null,
    });
    render(<AppHeader />);

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
    render(<AppHeader />);

    expect(screen.getByTestId('app-header-skeleton')).toBeInTheDocument();
  });

  it('does not show skeleton when data is available', () => {
    mockUseCurrentPageDataState.mockReturnValue({
      data: MENU_HEADER_BLOCK,
      loading: false,
      isFetching: false,
      error: null,
    });
    render(<AppHeader />);

    expect(screen.queryByTestId('app-header-skeleton')).not.toBeInTheDocument();
  });
});
