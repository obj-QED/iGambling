import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { InvalidResponsePage } from '@/pages/errors/InvalidResponsePage';

describe('InvalidResponsePage', () => {
  it('shows the backend syntax snippet', () => {
    render(
      <InvalidResponsePage
        status={500}
        message="Invalid JSON response"
        snippet="<br />Parse error: unexpected token"
      />,
    );

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Parse error: unexpected token');
  });
});
