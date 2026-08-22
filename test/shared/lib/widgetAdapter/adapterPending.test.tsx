import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import {
  AdapterPendingFallback,
  AdapterPendingProvider,
  useAdapterPending,
} from '@/shared/lib/widgetAdapter';

function PendingLabel() {
  const pending = useAdapterPending();
  return <span>{pending ? 'pending' : 'idle'}</span>;
}

function Shell() {
  const [showFallback, setShowFallback] = useState(true);

  return (
    <AdapterPendingProvider>
      <PendingLabel />
      {showFallback ? (
        <AdapterPendingFallback>
          <span>fallback</span>
        </AdapterPendingFallback>
      ) : null}
      <button type="button" onClick={() => setShowFallback(false)}>
        hide
      </button>
    </AdapterPendingProvider>
  );
}

describe('adapterPending', () => {
  it('is pending while a suspense fallback is mounted', async () => {
    const user = userEvent.setup();
    render(<Shell />);

    expect(screen.getByText('fallback')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'hide' }));

    expect(screen.queryByText('fallback')).not.toBeInTheDocument();
    expect(screen.getByText('idle')).toBeInTheDocument();
  });
});
