import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AppBootstrap } from '@/app/bootstrap/AppBootstrap';

const useAppBootstrapMock = vi.fn();

vi.mock('./useAppBootstrap', () => ({
  useAppBootstrap: (...args: unknown[]) => useAppBootstrapMock(...args),
}));

vi.mock('@hooks/useLanguage', () => ({
  useLanguage: () => 'en',
}));

vi.mock('@/app/routing/routes', () => ({
  AppRoutes: () => <div>routes-ready</div>,
}));

vi.mock('./GlobalPreloader', () => ({
  GlobalPreloader: () => <div>loading</div>,
}));

function renderBootstrap() {
  return render(
    <MemoryRouter>
      <AppBootstrap />
    </MemoryRouter>,
  );
}

describe('AppBootstrap', () => {
  beforeEach(() => {
    useAppBootstrapMock.mockReset();
  });

  it('shows preloader while bootstrap is pending', () => {
    useAppBootstrapMock.mockReturnValue({
      bootstrapRouteState: { status: 'pending' },
    });

    renderBootstrap();

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('shows server error page when bootstrap fails', () => {
    useAppBootstrapMock.mockReturnValue({
      bootstrapRouteState: { status: 'error', error: new Error('init failed') },
    });

    renderBootstrap();

    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('renders routes when bootstrap is ready', () => {
    useAppBootstrapMock.mockReturnValue({
      bootstrapRouteState: { status: 'ready' },
    });

    renderBootstrap();

    expect(screen.getByText('routes-ready')).toBeInTheDocument();
  });
});
