import { MantineProvider } from '@mantine/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  it('falls back to text logo when img errors and name is set', async () => {
    renderLogo(<AppLogo href="/" label="Brand" img="/uploads/broken.png" />);

    fireEvent.error(screen.getByRole('img', { name: 'Brand' }));

    expect(await screen.findByRole('button', { name: 'Brand' })).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('returns null when img errors and name is empty', async () => {
    const { container } = renderLogo(<AppLogo href="/" label="" img="/uploads/broken.png" />);

    const image = container.querySelector('img');
    expect(image).not.toBeNull();
    fireEvent.error(image!);

    await waitFor(() => {
      expect(screen.queryByRole('button')).toBeNull();
      expect(container.querySelector('img')).toBeNull();
    });
  });
});
