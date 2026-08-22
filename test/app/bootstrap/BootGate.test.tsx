import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { BootGate } from '@/app/bootstrap/BootGate';
import { AdapterPendingProvider } from '@/shared/lib/widgetAdapter';

const skeletonEnabled = vi.hoisted(() => ({ current: true }));

vi.mock('@/shared/config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/config')>();
  return {
    ...actual,
    isShellSkeletonEnabled: () => skeletonEnabled.current,
  };
});

function renderGate(bootstrapPending: boolean) {
  return render(
    <AdapterPendingProvider>
      <BootGate bootstrapPending={bootstrapPending}>
        <div>app-shell</div>
      </BootGate>
    </AdapterPendingProvider>,
  );
}

describe('BootGate', () => {
  afterEach(() => {
    skeletonEnabled.current = true;
  });

  it('keeps one preloader across bootstrap while skeleton is off', () => {
    skeletonEnabled.current = false;
    const { rerender } = renderGate(true);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
    expect(screen.queryByText('app-shell')).not.toBeInTheDocument();

    rerender(
      <AdapterPendingProvider>
        <BootGate bootstrapPending={false}>
          <div>app-shell</div>
        </BootGate>
      </AdapterPendingProvider>,
    );

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
    expect(screen.getByText('app-shell')).toBeInTheDocument();
  });

  it('hides preloader after adapters idle when skeleton is off', async () => {
    skeletonEnabled.current = false;
    renderGate(false);

    await act(async () => {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
    });

    await waitFor(() => {
      expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument();
    });
    expect(screen.getByText('app-shell')).toBeInTheDocument();
  });

  it('drops preloader after bootstrap when skeleton is on', () => {
    renderGate(false);
    expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument();
    expect(screen.getByText('app-shell')).toBeInTheDocument();
  });
});
