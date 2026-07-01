import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
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

describe('SearchBlock', () => {
  it('renders icon control instead of text button', () => {
    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <MemoryRouter>
          <SearchBlock item={{ key: 'search', url: 'search', name: 'search' }} />
        </MemoryRouter>
      </MantineProvider>,
    );

    expect(screen.getByRole('link', { name: 'search' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'search' })).not.toBeInTheDocument();
  });
});
