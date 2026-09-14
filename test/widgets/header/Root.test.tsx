import type { HeaderMenuModel } from '@/widgets/header';

import { configureStore } from '@reduxjs/toolkit';
import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { AppHeader, DEFAULT_HEADER_CONFIG } from '@/widgets/header';
import { contextReducer } from '@store/slices/contextSlice';

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

function renderHeader(menu: HeaderMenuModel = SAMPLE_MENU) {
  const store = configureStore({ reducer: { context: contextReducer } });

  return render(
    <Provider store={store}>
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <MemoryRouter>
          <AppHeader
            menu={menu}
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
      </MantineProvider>
    </Provider>,
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
    renderHeader({ sections: [{ key: 'empty', items: [{ key: 'x', name: '', url: '' }] }] });

    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
  });
});
