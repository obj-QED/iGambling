import type { HeaderMenuModel } from '@/widgets/header';

import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { AppHeader, DEFAULT_HEADER_CONFIG } from '@/widgets/header';

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

const SAMPLE_MENU: HeaderMenuModel = {
  sections: [
    {
      key: 'block3',
      items: [
        { key: 'search', url: 'search', name: 'search' },
        { key: 'logo', url: '/', name: 'logo', img: '/uploads/logo.png' },
      ],
    },
    {
      key: 'block1',
      items: [
        {
          key: 'profile',
          url: 'profile',
          name: 'Profile',
          items: [{ key: 'deposit', url: '/profile?tab=deposit', name: 'Deposit' }],
        },
      ],
    },
  ],
};

function renderHeader() {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <MemoryRouter>
        <AppHeader
          menu={SAMPLE_MENU}
          config={{
            ...DEFAULT_HEADER_CONFIG,
            layout: 'container',
            type: 'default',
            blockVariants: {},
            tooltip: {
              enabled: false,
              position: 'top',
              delay: 0,
              closeDelay: 300,
              withArrow: true,
              offset: 5,
            },
          }}
        />
      </MemoryRouter>
    </MantineProvider>,
  );
}

describe('AppHeader', () => {
  it('renders special blocks, logo and dropdown trigger', async () => {
    renderHeader();

    expect(screen.getByRole('button', { name: /logo/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders nothing when menu has no visible items', () => {
    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <MemoryRouter>
          <AppHeader
            menu={{ sections: [{ key: 'empty', items: [{ key: 'x', name: '', url: '' }] }] }}
            config={{
              ...DEFAULT_HEADER_CONFIG,
              layout: 'container',
              type: 'default',
              blockVariants: {},
              tooltip: {
                enabled: false,
                position: 'top',
                delay: 0,
                closeDelay: 300,
                withArrow: true,
                offset: 5,
              },
            }}
          />
        </MemoryRouter>
      </MantineProvider>,
    );

    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
  });
});
