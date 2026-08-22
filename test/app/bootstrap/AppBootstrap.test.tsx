import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import { Provider as ReactReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';

import { AppBootstrap } from '@/app/bootstrap/AppBootstrap';
import { mantineTheme } from '@/assets/theme';

const useAppBootstrapMock = vi.fn();

// Fix the mock path to point to the actual file
vi.mock('@/app/bootstrap/useAppBootstrap', () => ({
  useAppBootstrap: (...args: unknown[]) => useAppBootstrapMock(...args),
}));

vi.mock('@hooks/useLanguage', () => ({
  useLanguage: () => 'en',
}));

vi.mock('@/app/routing/routes', () => ({
  AppRoutes: () => <div>routes-ready</div>,
}));

// Mock useInitData hook to prevent it from trying to use react-query
vi.mock('@/api/lobby/queries/useInitData', () => ({
  useInitData: () => ({
    init: { status: 'idle', data: undefined },
    translation: { status: 'idle', data: undefined },
  }),
}));

function renderBootstrap() {
  // Create a mock Redux store with observable
  const observableMock = {
    subscribe: (_observer: any) => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return { unsubscribe: () => {} };
    },
    [Symbol.observable]: () => observableMock,
  };

  const mockStore = {
    dispatch: vi.fn(),
    getState: vi.fn(() => ({})),
    subscribe: vi.fn(),
    replaceReducer: vi.fn(),
    [Symbol.observable]: () => observableMock,
  };

  return render(
    <ReactReduxProvider store={mockStore}>
      <QueryClientProvider client={new QueryClient()}>
        <MantineProvider theme={mantineTheme} defaultColorScheme="light">
          <MemoryRouter>
            <AppBootstrap />
          </MemoryRouter>
        </MantineProvider>
      </QueryClientProvider>
    </ReactReduxProvider>,
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

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
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
