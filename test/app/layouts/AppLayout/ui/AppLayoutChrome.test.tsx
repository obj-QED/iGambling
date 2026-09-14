import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, expect, it, vi } from 'vitest';

import { AppLayoutChrome } from '@/app/layouts/AppLayout/AppLayoutChrome';
import { mantineTheme } from '@/assets/theme';
import { resolveBannerSchema } from '@/widgets/banner';
import { resolveFooterSchema } from '@/widgets/footer';
import { resolveHeaderSchema } from '@/widgets/header';
import { resolveSidebarSchema } from '@/widgets/sidebar';

vi.mock('@hooks/useIsMobile', () => ({
  useIsMobile: () => false,
}));

vi.mock('@/app/layouts/AppLayout/AppLayoutMain', () => ({
  AppLayoutMain: () => <main>page</main>,
}));

vi.mock('@/widgets/header', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/widgets/header')>();
  return {
    ...actual,
    AppHeader: () => (
      <header data-widget="header">
        <button type="button">Sign in</button>
      </header>
    ),
  };
});

vi.mock('@/widgets/sidebar', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/widgets/sidebar')>();
  return {
    ...actual,
    AppSidebar: () => (
      <aside data-widget="sidebar">
        <button type="button">Casino</button>
      </aside>
    ),
  };
});

vi.mock('@/widgets/footer', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/widgets/footer')>();
  return {
    ...actual,
    AppFooter: () => null,
  };
});

vi.mock('@/widgets/banner', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/widgets/banner')>();
  return {
    ...actual,
    AppBanner: () => null,
  };
});

const chromeProps = {
  headerMenu: { sections: [{ key: 'block1', items: [{ key: 'sign_in', name: 'Sign in' }] }] },
  headerConfig: resolveHeaderSchema({}),
  footerMenu: null,
  footerSchema: resolveFooterSchema({}),
  sidebarMenu: { sections: [{ key: 'nav', items: [{ key: 'casino', name: 'Casino' }] }] },
  sidebarConfig: resolveSidebarSchema({}),
  banner: null,
  bannerSchema: resolveBannerSchema({}),
};

describe('AppLayoutChrome', () => {
  it('overlays skeleton on live chrome nodes', () => {
    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <AppLayoutChrome {...chromeProps} skeleton />
      </MantineProvider>,
    );

    const shell = screen.getByRole('status', { name: /loading layout/i });
    expect(shell).toHaveAttribute('data-shell-skeleton');
    expect(shell.querySelector('[data-widget="header"]')).toBeInTheDocument();
    expect(shell.querySelector('[data-widget="sidebar"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Casino' })).toBeInTheDocument();
  });

  it('renders live chrome without skeleton overlay when ready', () => {
    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <AppLayoutChrome {...chromeProps} />
      </MantineProvider>,
    );

    expect(screen.queryByRole('status', { name: /loading layout/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });
});
