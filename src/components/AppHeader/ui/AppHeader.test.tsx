import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { AppHeader } from '@AppHeader/ui/AppHeader';
import { AppHeaderContainerLayout } from '@AppHeader/ui/layouts/AppHeaderContainerLayout';
import { AppHeaderDefaultView } from '@AppHeader/ui/variants/default/AppHeaderDefaultView';

const mockUseCurrentPageDataState = vi.fn();
const mockUseLanguage = vi.fn(() => 'ru');
const mockUseLocation = vi.fn(() => ({ pathname: '/' }));
const mockUseAuthSession = vi.fn(() => ({ isAuthenticated: false }));

vi.mock('@api/lobby', () => ({
  useCurrentPageDataState: () => mockUseCurrentPageDataState(),
}));

vi.mock('@hooks/useLanguage', () => ({
  useLanguage: () => mockUseLanguage(),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useLocation: () => mockUseLocation(),
  };
});

vi.mock('@hooks/useAuthSession', () => ({
  useAuthSession: () => mockUseAuthSession(),
}));

vi.mock('@shared/config', () => ({
  getHeaderSettings: () => ({
    layout: 'container',
    type: 'default',
    providers: [],
  }),
}));

/** Backend shape: one synthetic `header` row; children are real columns (`block3` → `block1`). */
const WRAPPED_HEADER_MENU = {
  blocks: [
    {
      buttonSearch: '',
      type: 'menuHeaderTop',
      menu: [
        {
          url: '#',
          name: 'header',
          key: 'header',
          img: '',
          items: [
            {
              url: '#',
              name: 'block3',
              key: 'block3',
              img: '',
              items: [
                { url: '/search', name: 'Search', key: 'search', img: '' },
                {
                  url: '/',
                  name: 'Casino',
                  key: 'logo',
                  img: '/uploads/jlogo.webp',
                },
              ],
            },
            {
              url: '#',
              name: 'block2',
              key: 'block2',
              img: '',
              items: [
                { url: '/slots', name: 'Slots', key: 'slots', img: '' },
                { url: '/casino', name: 'Casino', key: 'casino', img: '' },
              ],
            },
            {
              url: '#',
              name: 'block1',
              key: 'block1',
              img: '',
              items: [
                {
                  url: '/profile',
                  name: 'Profile',
                  key: 'profile',
                  img: '',
                  items: [
                    {
                      url: '/profile?tab=deposit',
                      name: 'Deposit',
                      key: 'deposit',
                      img: '',
                    },
                    {
                      url: '/profile?tab=info',
                      name: 'Profile',
                      key: 'profile',
                      img: '',
                    },
                  ],
                },
                {
                  url: '',
                  name: 'bonus_box',
                  key: 'bonus_box',
                  img: '',
                },
                {
                  url: '/wallet',
                  name: 'Wallet',
                  key: 'wallet',
                  img: '',
                },
                {
                  url: '',
                  name: 'notification',
                  key: 'notification',
                  img: '',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const MENU_HEADER_BLOCK = {
  blocks: [
    {
      buttonSearch: '1',
      type: 'menuHeaderTop',
      menu: [
        {
          url: '#',
          name: 'block1',
          key: 'block1',
          img: '',
          items: [
            { url: '', name: 'sign_up', key: 'sign_up', img: '' },
            { url: '', name: 'sign_in', key: 'sign_in', img: '' },
          ],
        },
        {
          url: '#',
          name: 'block2',
          key: 'block2',
          img: '',
          items: [
            { url: '/casino', name: 'casino', key: 'casino', img: '' },
            { url: '/slots', name: 'slots', key: 'slots', img: '' },
          ],
        },
        {
          url: '#',
          name: 'block3',
          key: 'block3',
          img: '',
          items: [
            { url: '/search', name: 'search', key: 'search', img: '' },
            { url: '/wallet', name: 'wallet', key: 'wallet', img: '' },
            { url: '/', name: 'logo', key: 'logo', img: '/logo.png' },
          ],
        },
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
  it('unwraps single `header` wrapper so columns and profile menu render in API order', () => {
    mockUseCurrentPageDataState.mockReturnValue({
      data: WRAPPED_HEADER_MENU,
      loading: false,
      isFetching: false,
      error: null,
    });
    const { container } = renderWithRouter(<AppHeader />);

    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument();

    const headerRoot = container.querySelector('header');
    expect(headerRoot).toBeTruthy();
    const interactiveItems = Array.from(headerRoot!.querySelectorAll('a,button'));

    expect(
      interactiveItems.map(
        (item) => item.getAttribute('aria-label') ?? item.textContent?.trim() ?? '',
      ),
    ).toEqual([
      'Search',
      'Casino',
      'Slots',
      'Casino',
      'Profile',
      'Bonuses',
      'Wallet',
      'Notifications',
      'Switch to dark theme',
    ]);
  });

  it('renders nested menu items in API order with dedicated special items', () => {
    mockUseCurrentPageDataState.mockReturnValue({
      data: MENU_HEADER_BLOCK,
      loading: false,
      isFetching: false,
      error: null,
    });
    const { container } = renderWithRouter(<AppHeader />);

    const interactiveItems = Array.from(container.querySelectorAll('a,button'));

    expect(
      interactiveItems.map(
        (item) => item.getAttribute('aria-label') ?? item.textContent?.trim(),
      ),
    ).toEqual([
      'sign_up',
      'sign_in',
      'Switch to dark theme',
      'casino',
      'slots',
      'search',
      'wallet',
      'logo',
    ]);
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

  it('renders one skeleton segment per backend menu item when loading data is already known', () => {
    renderWithRouter(
      <AppHeaderDefaultView
        params={{ layout: 'container', variant: 'default' }}
        data={MENU_HEADER_BLOCK.blocks[0]}
        loading
        error={null}
        isAuthenticated={false}
      />,
    );

    expect(screen.getAllByTestId('app-header-skeleton-item')).toHaveLength(7);
    expect(screen.getAllByTestId('app-header-skeleton-section')).toHaveLength(3);
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
