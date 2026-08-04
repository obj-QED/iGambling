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

function renderSearch(config: Partial<typeof DEFAULT_HEADER_CONFIG> = {}, initialPath = '/') {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <MemoryRouter initialEntries={[initialPath]}>
        <ConfigProvider config={{ ...DEFAULT_HEADER_CONFIG, ...config }}>
          <SearchBlock item={{ key: 'search', url: '/', name: 'search' }} />
        </ConfigProvider>
      </MemoryRouter>
    </MantineProvider>,
  );
}

describe('SearchBlock', () => {
  it('renders icon control by default (compact)', async () => {
    renderSearch();

    expect(await screen.findByRole('button', { name: 'search' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'search' })).not.toBeInTheDocument();
  });

  it('does not set data-active for compact search', async () => {
    renderSearch({ blockVariants: { search: 'compact' } }, '/');

    expect(await screen.findByRole('button', { name: 'search' })).not.toHaveAttribute(
      'data-active',
    );
  });

  it('disables compact search on /profile', async () => {
    const { unmount } = renderSearch({ blockVariants: { search: 'compact' } }, '/profile');
    expect(await screen.findByRole('button', { name: 'search' })).toBeDisabled();
    unmount();

    renderSearch({ blockVariants: { search: 'compact' } }, '/');
    expect(await screen.findByRole('button', { name: 'search' })).not.toBeDisabled();
  });

  it('renders text input for input variant', async () => {
    renderSearch({ blockVariants: { search: 'input' } });

    expect(await screen.findByRole('textbox', { name: 'search' })).toBeInTheDocument();
  });

  it('renders modal wrapper trigger when wrappers.search is modal', async () => {
    renderSearch({
      blockVariants: { search: 'compact' },
      wrappers: { search: 'modal' },
    });

    expect(await screen.findByRole('button', { name: 'search' })).toBeInTheDocument();
  });

  it('hides when capability search is false', () => {
    renderSearch({
      capabilities: { ...DEFAULT_HEADER_CONFIG.capabilities, search: false },
    });
    expect(screen.queryByRole('button', { name: 'search' })).not.toBeInTheDocument();
  });
});
