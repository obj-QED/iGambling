import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { InvalidResponseError, reportInvalidResponse, resetInvalidResponse } from '@/api/baseApi';
import { InvalidResponseGate } from '@/app/bootstrap/InvalidResponseGate';

describe('InvalidResponseGate', () => {
  afterEach(() => {
    resetInvalidResponse();
  });

  it('renders children when the API payload is valid', () => {
    render(
      <InvalidResponseGate>
        <div>app-ok</div>
      </InvalidResponseGate>,
    );

    expect(screen.getByText('app-ok')).toBeInTheDocument();
  });

  it('replaces the tree with the syntax error page', () => {
    reportInvalidResponse(
      new InvalidResponseError(500, 'Invalid JSON response', '<br />Parse error: syntax'),
    );

    render(
      <InvalidResponseGate>
        <div>app-ok</div>
      </InvalidResponseGate>,
    );

    expect(screen.queryByText('app-ok')).not.toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Invalid server response.')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Parse error: syntax');
  });
});
