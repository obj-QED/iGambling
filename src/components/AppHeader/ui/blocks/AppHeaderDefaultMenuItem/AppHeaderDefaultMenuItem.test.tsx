import type { ReactElement } from 'react';

import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { AppHeaderDefaultMenuItem } from './AppHeaderDefaultMenuItem';

vi.mock('react-inlinesvg', () => ({
  default: ({ src, ...props }: { src: string }) => <svg data-testid="inline-svg" data-src={src} {...props} />,
}));

function renderWithProviders(ui: ReactElement) {
  return render(
    <MantineProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>,
  );
}

describe('AppHeaderDefaultMenuItem', () => {
  it('renders disabled button without link when url is empty (same as invalid href contract)', () => {
    const { container } = renderWithProviders(
      <AppHeaderDefaultMenuItem
        item={{ url: '', name: 'casino', key: 'casino', img: '' }}
      />,
    );

    const button = screen.getByRole('button', { name: 'casino' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-invalid-href', 'true');
    expect(screen.queryByRole('link', { name: 'casino' })).not.toBeInTheDocument();
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('renders raster image icon when item img is not svg', () => {
    const { container } = renderWithProviders(
      <AppHeaderDefaultMenuItem
        item={{ url: '/casino', name: 'casino', key: 'casino', img: '/icons/casino.webp' }}
      />,
    );

    expect(screen.getByRole('link', { name: 'casino' })).toHaveAttribute('href', '/casino');
    expect(container.querySelector('img[src="/icons/casino.webp"]')).toBeInTheDocument();
  });

  it('does not rewrite backend url; bare segments stay invalid for shared href contract', () => {
    renderWithProviders(
      <AppHeaderDefaultMenuItem
        item={{ url: 'slots', name: 'slots', key: 'slots', img: '' }}
      />,
    );

    const button = screen.getByRole('button', { name: 'slots' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-invalid-href', 'true');
  });

  it('renders inline svg icon when item img is svg', () => {
    renderWithProviders(
      <AppHeaderDefaultMenuItem
        item={{ url: '/casino', name: 'casino', key: 'casino', img: '/icons/casino.svg' }}
      />,
    );

    expect(screen.getByTestId('inline-svg')).toHaveAttribute('data-src', '/icons/casino.svg');
  });
});
