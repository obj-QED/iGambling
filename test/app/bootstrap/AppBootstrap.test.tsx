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

vi.mock('@/api/lobby/queries/useInitData', () => ({
  useInitData: () => ({
    init: { status: 'idle', data: undefined },
    initKey: ['lobby', 'init', 'en', '/'],
  }),
}));

vi.mock('@/api/lobby/queries/useTranslation', () => ({
  useTranslation: () => ({
    translation: { status: 'idle', data: undefined },
    translationKey: ['lobby', 'translation', 'en'],
    language: 'en',
    isReady: false,
    t: (key: string) => key,
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

const idleInit = {
  content: undefined,
  extra: undefined,
  loading: true,
  error: null,
  query: { status: 'pending' as const },
};

function mockBootstrap(status: 'pending' | 'ready' | 'error', error?: Error) {
  useAppBootstrapMock.mockReturnValue({
    bootstrapRouteState:
      status === 'error'
        ? { status: 'error', error: error ?? new Error('init failed') }
        : { status },
    init: idleInit,
    translation: idleInit,
    initKey: ['lobby', 'init', 'en', '/'],
    translationKey: ['lobby', 'translation', 'en'],
    language: 'en',
    t: (key: string) => key,
  });
}

describe('AppBootstrap', () => {
  beforeEach(() => {
    useAppBootstrapMock.mockReset();
    mockBootstrap('pending');
  });

  it('shows preloader while bootstrap is pending', () => {
    mockBootstrap('pending');
    renderBootstrap();

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('shows server error page when bootstrap fails', () => {
    mockBootstrap('error');
    renderBootstrap();

    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('renders routes when bootstrap is ready', () => {
    mockBootstrap('ready');
    renderBootstrap();

    expect(screen.getByText('routes-ready')).toBeInTheDocument();
  });
});
