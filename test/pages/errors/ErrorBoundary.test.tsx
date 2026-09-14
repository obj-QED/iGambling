import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';

import { ErrorBoundary } from '@/pages/errors/ErrorBoundary';

function Boom(): never {
  throw new Error('render crashed');
}

describe('ErrorBoundary', () => {
  const consoleError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = consoleError;
  });

  it('renders the 500 page when a child throws', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText(/Server error/i)).toBeInTheDocument();
  });
});
