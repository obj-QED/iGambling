import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { AppLink } from '@/shared/ui/AppLink';

function renderLink(ui: React.ReactElement, path = '/') {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
    </MantineProvider>,
  );
}

describe('AppLink', () => {
  it('renders Anchor → internal RR Link', () => {
    renderLink(<AppLink href="/games">Games</AppLink>);

    const link = screen.getByRole('link', { name: 'Games' });
    expect(link).toHaveAttribute('href', '/games');
    expect(link.tagName).toBe('A');
  });

  it('renders external http link with target blank', () => {
    renderLink(<AppLink href="https://example.com">External</AppLink>);

    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('invalid href → span', () => {
    renderLink(<AppLink href="">Broken</AppLink>);

    const node = screen.getByText('Broken');
    expect(node.tagName).toBe('SPAN');
    expect(node).toHaveAttribute('data-invalid-href');
    expect(node).toHaveAttribute('aria-disabled', 'true');
  });

  it('sets data-active and aria-current when href matches location', () => {
    renderLink(<AppLink href="/games">Games</AppLink>, '/games');

    const link = screen.getByRole('link', { name: 'Games' });
    expect(link).toHaveAttribute('data-active', 'true');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('does not set data-active for a different internal path', () => {
    renderLink(<AppLink href="/games">Games</AppLink>, '/home');

    const link = screen.getByRole('link', { name: 'Games' });
    expect(link).not.toHaveAttribute('data-active');
    expect(link).not.toHaveAttribute('aria-current');
  });

  it('respects matchRoute={false}', () => {
    renderLink(
      <AppLink href="/games" matchRoute={false}>
        Games
      </AppLink>,
      '/games',
    );

    const link = screen.getByRole('link', { name: 'Games' });
    expect(link).not.toHaveAttribute('data-active');
  });

  it('respects explicit active override', () => {
    renderLink(
      <AppLink href="/games" active>
        Games
      </AppLink>,
      '/other',
    );

    const link = screen.getByRole('link', { name: 'Games' });
    expect(link).toHaveAttribute('data-active', 'true');
    expect(link).toHaveAttribute('aria-current', 'page');
  });
});
