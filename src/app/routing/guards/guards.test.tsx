import type { PropsWithChildren } from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { GuestRoute } from './GuestRoute';
import { ProtectedRoute } from './ProtectedRoute';

function renderWithAuth(
  ui: React.ReactElement,
  isAuthenticated: boolean,
  initialEntries: string[] = ['/'],
) {
  const store = configureStore({
    reducer: {
      auth: () => ({ isAuthenticated }),
    },
  });

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper });
}

describe('routing guards', () => {
  it('ProtectedRoute redirects guest to /auth', () => {
    renderWithAuth(
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>private content</div>} />
        </Route>
        <Route path="/auth" element={<div>auth page</div>} />
      </Routes>,
      false,
    );

    expect(screen.getByText('auth page')).toBeInTheDocument();
  });

  it('GuestRoute redirects authenticated user to profile activation', () => {
    renderWithAuth(
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/auth" element={<div>auth page</div>} />
        </Route>
        <Route path="/profile/activation" element={<div>activation page</div>} />
      </Routes>,
      true,
      ['/auth'],
    );

    expect(screen.getByText('activation page')).toBeInTheDocument();
  });
});
