import type { HeaderMenuItem } from '@/widgets/header';
import type { HeaderTypePack } from '@/widgets/header/ui/type/types';

import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { DEFAULT_HEADER_CONFIG } from '@/widgets/header/config';
import { ConfigProvider, HeaderTypePackContext } from '@/widgets/header/context';
import { Block } from '@/widgets/header/ui/Block';
import { resolveHeaderTypePack } from '@/widgets/header/ui/type';

function SearchOverlay() {
  return <span data-testid="search-overlay">search overlay</span>;
}

function renderBlock(
  item: HeaderMenuItem,
  typePack: HeaderTypePack = resolveHeaderTypePack('default'),
) {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <MemoryRouter>
        <ConfigProvider config={DEFAULT_HEADER_CONFIG}>
          <HeaderTypePackContext.Provider value={typePack}>
            <Block item={item} />
          </HeaderTypePackContext.Provider>
        </ConfigProvider>
      </MemoryRouter>
    </MantineProvider>,
  );
}

describe('HeaderBlock', () => {
  it('renders a default menu item', () => {
    renderBlock({ key: 'profile', url: '/profile', name: 'Profile' });

    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders nested items as a dropdown trigger', () => {
    renderBlock({
      key: 'profile',
      url: '/profile',
      name: 'Profile',
      items: [{ key: 'deposit', url: '/profile?tab=deposit', name: 'Deposit' }],
    });

    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Profile' })).not.toBeInTheDocument();
  });

  it('uses typePack.blocks overlay for special keys', () => {
    renderBlock(
      { key: 'search', url: '/', name: 'search' },
      {
        ...resolveHeaderTypePack('default'),
        blocks: { search: SearchOverlay },
      },
    );

    expect(screen.getByTestId('search-overlay')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'search' })).not.toBeInTheDocument();
  });
});
