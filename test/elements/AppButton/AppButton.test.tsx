import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { AppButton } from '@/elements';

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
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={ui} />
          <Route path="/home" element={<div>home page</div>} />
        </Routes>
      </MemoryRouter>
    </MantineProvider>,
  );
}

describe('AppButton', () => {
  it('returns null when label is empty and there are no sections', () => {
    renderButton(<AppButton label="" href="/home" />);

    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('renders button with leftSection when label is empty', () => {
    renderButton(
      <AppButton
        label=""
        href="/home"
        aria-label="home"
        leftSection={<span data-testid="icon">icon</span>}
      />,
    );

    expect(screen.getByRole('button', { name: 'home' })).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders disabled button when href is invalid', () => {
    renderButton(<AppButton label="Home" href="" />);

    expect(screen.getByRole('button', { name: 'Home' })).toBeDisabled();
  });

  it('renders disabled button when href fails validation', () => {
    renderButton(<AppButton label="Home" href="rel" />);

    expect(screen.getByRole('button', { name: 'Home' })).toBeDisabled();
  });

  it('calls onClick before href navigation', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderButton(<AppButton label="Home" href="/home" onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: 'Home' }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText('home page')).toBeInTheDocument();
  });

  it('does not put CMF size table in element.style', () => {
    renderButton(<AppButton label="Sized" size="sm" variant="default" />);

    const button = screen.getByRole('button', { name: 'Sized' });
    expect(button).toHaveAttribute('data-size', 'sm');
    // Mantine may set `--button-height: var(--button-height-sm)`; we must not inject the size table.
    expect(button.style.getPropertyValue('--button-height-sm')).toBe('');
    expect(button.style.getPropertyValue('--button-bg')).toContain('var(--cmf-button-default-bg');
  });
});
