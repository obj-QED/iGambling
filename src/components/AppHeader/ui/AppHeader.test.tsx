import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AppHeader } from './AppHeader';

const mockUseCurrentPageDataState = vi.fn();
const mockUseLanguage = vi.fn(() => 'ru');
const mockUseLocation = vi.fn(() => ({ pathname: '/' }));

vi.mock('@/api/lobby', () => ({
  useCurrentPageDataState: () => mockUseCurrentPageDataState(),
}));

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => mockUseLanguage(),
}));

vi.mock('react-router-dom', () => ({
  useLocation: () => mockUseLocation(),
}));

describe('AppHeader', () => {
  it('shows component skeleton while page data is loading', () => {
    mockUseCurrentPageDataState.mockReturnValue({ data: undefined, loading: true });
    render(<AppHeader />);

    expect(screen.getByTestId('app-header-skeleton').className).toContain('root__skeleton--visible');
    expect(screen.getByTestId('app-header-title').className).toContain('root__title--hidden');
  });
});
