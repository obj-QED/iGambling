import type { ReactElement } from 'react';

import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Button } from '../ui/Button';

function renderButton(ui: ReactElement) {
  return render(
    <MantineProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>,
  );
}

describe('Button', () => {
  it('renders internal urls through router-compatible links', () => {
    renderButton(
      <Button varsKey="header-btn-login" url="/auth">
        Sign in
      </Button>,
    );

    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/auth');
  });

  it('renders external urls as safe native links', () => {
    renderButton(
      <Button varsKey="header-btn-login" url="https://example.com">
        External link
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'External link' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not navigate for invalid urls', () => {
    renderButton(
      <Button varsKey="header-btn-login" url="relative-path">
        Invalid href
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Invalid href' });
    expect(button).toHaveAttribute('data-invalid-href', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('treats empty string url as invalid via getMantineAppHrefProps', () => {
    renderButton(
      <Button varsKey="header-btn-login" url="">
        No link
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'No link' });
    expect(button).toHaveAttribute('data-invalid-href', 'true');
    expect(button).toBeDisabled();
  });

  it('renders icon on the requested side', () => {
    renderButton(
      <Button
        varsKey="header-btn-register"
        icon={<span data-testid="button-icon">icon</span>}
        iconPosition="right"
      >
        Register
      </Button>,
    );

    expect(screen.getByTestId('button-icon').closest('[data-position="right"]')).toBeInTheDocument();
  });

  it('renders string icon values as decorative images', () => {
    const { container } = renderButton(
      <Button varsKey="header-btn-register" icon="/icons/user-plus.png" iconPosition="right">
        Register
      </Button>,
    );

    const image = container.querySelector('img[src="/icons/user-plus.png"]');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', '');
    expect(image).toHaveAttribute('aria-hidden', 'true');
    expect(image?.closest('[data-position="right"]')).toBeInTheDocument();
  });
});
