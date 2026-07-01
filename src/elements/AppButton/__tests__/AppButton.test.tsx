import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { AppButton } from '@/elements/AppButton';

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

function renderButton(ui: React.ReactElement) {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>,
  );
}

describe('AppButton', () => {
  it('returns null when label is empty and there are no sections', () => {
    renderButton(<AppButton label="" href="/home" />);

    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('renders link button with leftSection when label is empty', () => {
    renderButton(
      <AppButton
        label=""
        href="/home"
        aria-label="home"
        leftSection={<span data-testid="icon">icon</span>}
      />,
    );

    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute('href', '/home');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders disabled button when href is invalid', () => {
    renderButton(<AppButton label="Home" href="" />);

    expect(screen.getByRole('button', { name: 'Home' })).toBeDisabled();
  });

  it('renders link button when href is valid', () => {
    renderButton(<AppButton label="Home" href="/home" />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
  });
});
