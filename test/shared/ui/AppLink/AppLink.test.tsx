import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AppLink } from '@/shared/ui/AppLink';

describe('AppLink', () => {
  it('renders internal route as react-router Link', () => {
    render(
      <MemoryRouter>
        <AppLink href="/games">Games</AppLink>
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'Games' });
    expect(link).toHaveAttribute('href', '/games');
    expect(link.tagName).toBe('A');
  });

  it('renders external http link with target blank', () => {
    render(<AppLink href="https://example.com">External</AppLink>);

    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders invalid href as disabled span', () => {
    render(<AppLink href="">Broken</AppLink>);

    const node = screen.getByText('Broken');
    expect(node.tagName).toBe('SPAN');
    expect(node).toHaveAttribute('data-invalid-href');
    expect(node).toHaveAttribute('aria-disabled', 'true');
  });
});
