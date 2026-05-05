import type { ReactElement } from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AppLink } from '../AppLink';

function renderWithRouter(ui: ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('AppLink', () => {
  it('renders internal paths as router links', () => {
    renderWithRouter(<AppLink href="/games">Lobby</AppLink>);
    expect(screen.getByRole('link', { name: 'Lobby' })).toHaveAttribute('href', '/games');
  });

  it('renders external https URLs as native anchors with rel/target', () => {
    renderWithRouter(<AppLink href="https://example.com/path">Out</AppLink>);
    const link = screen.getByRole('link', { name: 'Out' });
    expect(link).toHaveAttribute('href', 'https://example.com/path');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders invalid href as non-navigating span', () => {
    renderWithRouter(<AppLink href="relative-url">Bad</AppLink>);
    const span = screen.getByText('Bad');
    expect(span.tagName.toLowerCase()).toBe('span');
    expect(span).toHaveAttribute('data-invalid-href');
  });
});
