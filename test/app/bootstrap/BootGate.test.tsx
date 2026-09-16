import type { ReactNode } from 'react';

import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { BootGate } from '@/app/bootstrap/BootGate';
import { AdapterPendingFallback, AdapterPendingProvider } from '@/shared/lib/widgetAdapter';

const skeletonEnabled = vi.hoisted(() => ({ current: true }));

vi.mock('@/shared/config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/config')>();
  return {
    ...actual,
    isShellSkeletonEnabled: () => skeletonEnabled.current,
  };
});

function renderGate(bootstrapPending: boolean, child: ReactNode = <div>app-shell</div>) {
  return render(
    <AdapterPendingProvider>
      <BootGate bootstrapPending={bootstrapPending}>{child}</BootGate>
    </AdapterPendingProvider>,
  );
}

describe('BootGate', () => {
  afterEach(() => {
    skeletonEnabled.current = true;
  });

  it('mounts shell under preloader while bootstrap is pending (skeleton off)', () => {
    skeletonEnabled.current = false;
    const { rerender } = renderGate(true);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
    expect(screen.getByText('app-shell')).toBeInTheDocument();

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

  it('mounts shell under preloader while bootstrap is pending (skeleton on)', () => {
    renderGate(true);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
    expect(screen.getByText('app-shell')).toBeInTheDocument();
  });

  it('holds preloader while chrome adapters are pending (skeleton off)', async () => {
    skeletonEnabled.current = false;
    renderGate(
      false,
      <AdapterPendingFallback>
        <div>pending-adapter</div>
      </AdapterPendingFallback>,
    );

    await act(async () => {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });
    });

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
    expect(screen.getByText('pending-adapter')).toBeInTheDocument();
  });

  it('hides preloader after adapters idle when skeleton is off', async () => {
    skeletonEnabled.current = false;
    renderGate(false);

    await act(async () => {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
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
