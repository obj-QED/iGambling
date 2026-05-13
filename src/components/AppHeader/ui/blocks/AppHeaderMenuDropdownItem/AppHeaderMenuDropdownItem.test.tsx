import type { ReactElement } from 'react';

import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { AppHeaderMenuDropdownItem } from './AppHeaderMenuDropdownItem';

vi.mock('react-inlinesvg', () => ({
  default: ({ src, ...props }: { src: string }) => <svg data-testid="inline-svg" data-src={src} {...props} />,
}));

function renderWithProviders(ui: ReactElement) {
  return render(
    <MantineProvider>
      <MemoryRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        {ui}
      </MemoryRouter>
    </MantineProvider>,
  );
}

describe('AppHeaderMenuDropdownItem', () => {
  it('opens menu and exposes internal links with backend hrefs as-is', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <AppHeaderMenuDropdownItem
        item={{
          url: '/profile',
          name: 'Profile',
          key: 'profile',
          img: '',
          items: [
            { url: '/profile?tab=deposit', name: 'Deposit', key: 'deposit', img: '' },
            { url: '/profile?tab=info', name: 'Profile info', key: 'profile_tab', img: '' },
          ],
        }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Profile' })).toHaveAttribute('aria-expanded', 'false');

    await user.click(screen.getByRole('button', { name: 'Profile' }));

    const menu = await screen.findByRole('menu', { hidden: true });
    expect(menu).toBeInTheDocument();

    const deposit = await screen.findByRole('menuitem', { name: 'Deposit', hidden: true });
    expect(deposit).toHaveAttribute('href', '/profile?tab=deposit');
  });

  it('renders invalid child rows as disabled menu buttons (same contract as Button invalid href)', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <AppHeaderMenuDropdownItem
        item={{
          url: '/profile',
          name: 'Profile',
          key: 'profile',
          img: '',
          items: [{ url: '', name: 'Broken', key: 'broken', img: '' }],
        }}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Profile' }));

    const broken = await screen.findByRole('menuitem', { name: 'Broken', hidden: true });
    expect(broken.tagName.toLowerCase()).toBe('button');
    expect(broken).toHaveAttribute('data-invalid-href', 'true');
    expect(broken).not.toHaveAttribute('href');
    expect(broken).toBeDisabled();
  });

  it('treats `#` placeholder child urls as non-navigable (disabled control, no href)', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <AppHeaderMenuDropdownItem
        item={{
          url: '/profile',
          name: 'Profile',
          key: 'profile',
          img: '',
          items: [{ url: '#', name: 'Theme link', key: 'theme_bad', img: '' }],
        }}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Profile' }));

    const row = await screen.findByRole('menuitem', { name: 'Theme link', hidden: true });
    expect(row.tagName.toLowerCase()).toBe('button');
    expect(row).toHaveAttribute('data-invalid-href', 'true');
    expect(row).not.toHaveAttribute('href');
    expect(row).toBeDisabled();
  });
});
