import { render, screen, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { UseAppLayoutResult } from '@/app/layouts/AppLayout/useAppLayout';
import { AppLayout } from '@/app/layouts/AppLayout/AppLayout';
import { mantineTheme } from '@/assets/theme';

const useAppLayoutMock = vi.fn();
const skeletonEnabled = vi.hoisted(() => ({ current: true }));

vi.mock('@/app/layouts/AppLayout/useAppLayout', () => ({
  useAppLayout: (...args: unknown[]) => useAppLayoutMock(...args),
}));

vi.mock('@hooks/useLanguage', () => ({
  useLanguage: () => 'en',
}));

vi.mock('@/shared/config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/config')>();
  return {
    ...actual,
    isShellSkeletonEnabled: () => skeletonEnabled.current,
  };
});

vi.mock('@/app/layouts/AppLayout/AppLayoutChrome', () => ({
  AppLayoutChrome: ({ skeleton }: { skeleton?: boolean }) => (
    <div>{skeleton ? 'chrome-skeleton' : 'chrome-ready'}</div>
  ),
}));

const layoutStub: UseAppLayoutResult = {
  headerMenu: { sections: [] },
  headerConfig: {} as UseAppLayoutResult['headerConfig'],
  footerMenu: { sections: [] },
  footerSchema: {} as UseAppLayoutResult['footerSchema'],
  sidebarMenu: { sections: [] },
  sidebarConfig: {} as UseAppLayoutResult['sidebarConfig'],
  banner: null,
  bannerSchema: {} as UseAppLayoutResult['bannerSchema'],
  isReady: true,
};

function renderLayout() {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <AppLayout />
    </MantineProvider>,
  );
}

describe('AppLayout', () => {
  beforeEach(() => {
    useAppLayoutMock.mockReset();
    skeletonEnabled.current = true;
  });

  afterEach(() => {
    skeletonEnabled.current = true;
  });

  it('keeps element skeleton until init is ready', () => {
    useAppLayoutMock.mockReturnValue({ ...layoutStub, isReady: false });

    renderLayout();

    expect(screen.getByText('chrome-skeleton')).toBeInTheDocument();
    expect(screen.queryByText('chrome-ready')).not.toBeInTheDocument();
    expect(screen.queryByRole('status', { name: /^loading$/i })).not.toBeInTheDocument();
  });

  it('reveals live chrome after skeleton hold', async () => {
    useAppLayoutMock.mockReturnValue(layoutStub);

    renderLayout();

    expect(screen.getByText('chrome-skeleton')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('chrome-ready')).toBeInTheDocument();
    });
  });

  it('skips skeleton when params.preloader.skeleton is false', () => {
    skeletonEnabled.current = false;
    useAppLayoutMock.mockReturnValue(layoutStub);

    renderLayout();

    expect(screen.getByText('chrome-ready')).toBeInTheDocument();
    expect(screen.queryByText('chrome-skeleton')).not.toBeInTheDocument();
  });
});
