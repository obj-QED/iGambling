import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppearWipe } from '@/shared/ui/AppearWipe';

describe('AppearWipe', () => {
  it('renders children', () => {
    render(
      <AppearWipe contentKey="a">
        <span>Hello wipe</span>
      </AppearWipe>,
    );
    expect(screen.getByText('Hello wipe')).toBeInTheDocument();
  });
});
