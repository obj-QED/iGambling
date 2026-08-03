import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { DEFAULT_HEADER_CONFIG } from '@/widgets/header/config';
import { ConfigProvider } from '@/widgets/header/context';
import { SearchBlock } from '@/widgets/header/ui/blocks/SearchBlock/SearchBlock';

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

function renderSearch(
  blockVariants: typeof DEFAULT_HEADER_CONFIG.blockVariants = {},
  initialPath = '/',
) {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <MemoryRouter initialEntries={[initialPath]}>
        <ConfigProvider config={{ ...DEFAULT_HEADER_CONFIG, blockVariants }}>
          <SearchBlock item={{ key: 'search', url: '/', name: 'search' }} />
        </ConfigProvider>
      </MemoryRouter>
    </MantineProvider>,
  );
}

describe('SearchBlock', () => {
  it('renders icon control by default (compact)', () => {
    renderSearch();

    expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'search' })).not.toBeInTheDocument();
  });

  it('does not set data-active for compact search', () => {
    renderSearch({ search: 'compact' }, '/');

    expect(screen.getByRole('button', { name: 'search' })).not.toHaveAttribute('data-active');
  });

  it('disables compact search only on /404', () => {
    const { unmount } = renderSearch({ search: 'compact' }, '/404');
    expect(screen.getByRole('button', { name: 'search' })).toBeDisabled();
    unmount();

    renderSearch({ search: 'compact' }, '/');
    expect(screen.getByRole('button', { name: 'search' })).not.toBeDisabled();
  });

  it('renders icon control for compact / icon', () => {
    renderSearch({ search: 'compact' });

    expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
  });

  it('renders text input for input variant', () => {
    renderSearch({ search: 'input' });

    expect(screen.getByRole('textbox', { name: 'search' })).toBeInTheDocument();
  });

  it('renders modal trigger for modal variant', () => {
    renderSearch({ search: 'modal' });

    expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
  });
});
