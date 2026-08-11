import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { AppButton } from '@/shared/ui';
import { CmfActiveIndicatorProvider } from '@/shared/ui/CmfActiveLine';

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

function renderButton(
  ui: React.ReactElement,
  active: { type: 'line' | 'element'; position: 'bottom' | 'top' | 'left' | 'right' } = {
    type: 'element',
    position: 'bottom',
  },
) {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <CmfActiveIndicatorProvider value={active}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={ui} />
            <Route path="/home" element={<div>home page</div>} />
          </Routes>
        </MemoryRouter>
      </CmfActiveIndicatorProvider>
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

  it('maps fullscreen to Mantine fullWidth', () => {
    renderButton(<AppButton label="Wide" fullscreen />);

    const button = screen.getByRole('button', { name: 'Wide' });
    expect(button).toHaveAttribute('data-block', 'true');
  });

  it('mounts CmfActiveLine DOM node when data-active and active.type=line', () => {
    renderButton(<AppButton label="Active" data-active="true" data-cmf-component="header" />, {
      type: 'line',
      position: 'bottom',
    });

    const button = screen.getByRole('button', { name: 'Active' });
    const line = button.querySelector('[data-cmf-active-line]');
    expect(line).not.toBeNull();
    expect(line).toHaveAttribute('data-cmf-active-control', 'button');
  });

  it('does not mount active line when active.type is element (aside default)', () => {
    renderButton(<AppButton label="Active" data-active="true" data-cmf-component="sidebar" />);

    expect(
      screen.getByRole('button', { name: 'Active' }).querySelector('[data-cmf-active-line]'),
    ).toBeNull();
  });

  it('does not mount active line for button-link variant', () => {
    renderButton(<AppButton label="Linkish" data-active="true" data-variant="button-link" />, {
      type: 'line',
      position: 'bottom',
    });

    expect(
      screen.getByRole('button', { name: 'Linkish' }).querySelector('[data-cmf-active-line]'),
    ).toBeNull();
  });
});
