import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { AppLogo } from '@/shared/ui';

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

function renderLogo(ui: React.ReactElement) {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>,
  );
}

describe('AppLogo', () => {
  it('renders text logo when img is missing', () => {
    renderLogo(<AppLogo href="/" label="Brand" />);

    expect(screen.getByRole('button', { name: 'Brand' })).toBeInTheDocument();
    expect(screen.getByText('Brand')).toBeInTheDocument();
  });

  it('renders image logo when img is set', () => {
    renderLogo(<AppLogo href="/" label="Brand" img="/uploads/logo.png" />);

    expect(screen.getByRole('img', { name: 'Brand' })).toHaveAttribute('src', '/uploads/logo.png');
  });

  it('returns null when label and img are empty', () => {
    renderLogo(<AppLogo href="/" label="   " />);

    expect(screen.queryByRole('button')).toBeNull();
  });
});
