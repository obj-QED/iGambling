import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { Dropdown } from '@/widgets/header/ui/menu/Dropdown/Dropdown';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
});

describe('Dropdown', () => {
  it('opens menu on trigger click without navigating away', async () => {
    const user = userEvent.setup();

    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <MemoryRouter>
          <Dropdown
            item={{
              key: 'profile',
              url: 'profile?tab=info',
              name: 'Profile',
              img: '/icon.webp',
              items: [{ key: 'deposit', url: '/profile?tab=deposit', name: 'Deposit' }],
            }}
          />
        </MemoryRouter>
      </MantineProvider>,
    );

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Profile' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Profile' }));

    expect(await screen.findByRole('menuitem', { name: 'Deposit' })).toBeInTheDocument();
  });

  it('does not render when parent has no visible content', () => {
    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <Dropdown
          item={{
            key: 'empty',
            url: '',
            name: '',
            items: [{ key: 'child', url: '/child', name: 'Child' }],
          }}
        />
      </MantineProvider>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
