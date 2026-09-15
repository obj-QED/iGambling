import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import '@testing-library/jest-dom';

import { RouterErrorPage } from '@/pages/errors/RouterErrorPage';

function Boom(): never {
  throw new Error('route crashed');
}

describe('RouterErrorPage', () => {
  const consoleError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = consoleError;
  });

  it('renders the 500 page when a route child throws', () => {
    const router = createMemoryRouter(
      [{ path: '/', Component: Boom, errorElement: <RouterErrorPage /> }],
      { initialEntries: ['/'] },
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText(/Server error/i)).toBeInTheDocument();
  });
});
