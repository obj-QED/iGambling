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

describe('AppHeader', () => {
  it('uses single-section layout when one section is passed', () => {
    mockUseCurrentPageDataState.mockReturnValue({ data: { meta_title: 'Main' }, loading: false });
    render(<AppHeader sections={['only']} />);

    expect(screen.getByRole('banner')).toHaveAttribute('data-sections', '1');
  });

  it('applies classic variant metadata', () => {
    mockUseCurrentPageDataState.mockReturnValue({ data: { meta_title: 'Main' }, loading: false });
    render(<AppHeader variant='classic' />);

    expect(screen.getByRole('banner')).toHaveAttribute('data-variant', 'classic');
  });

  it('renders 3 sections and fluid container layout', () => {
    mockUseCurrentPageDataState.mockReturnValue({ data: { meta_title: 'Main' }, loading: false });
    render(<AppHeader layout='container-fluid' />);

    expect(screen.getByText('Guest')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows component skeleton while page data is loading', () => {
    mockUseCurrentPageDataState.mockReturnValue({ data: undefined, loading: true });
    render(<AppHeader />);

    expect(screen.getByTestId('app-header-skeleton').className).toContain('root__skeleton--visible');
    expect(screen.getByTestId('app-header-title').className).toContain('root__title--hidden');
  });
});
