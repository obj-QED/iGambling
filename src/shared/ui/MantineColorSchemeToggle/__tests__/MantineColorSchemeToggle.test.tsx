import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { MantineColorSchemeToggle } from '../MantineColorSchemeToggle';

describe('MantineColorSchemeToggle', () => {
  it('toggles aria-label after click', async () => {
    const user = userEvent.setup();
    render(
      <MantineProvider defaultColorScheme="dark">
        <MantineColorSchemeToggle />
      </MantineProvider>,
    );

    const btn = screen.getByRole('button', { name: /Switch to light theme/i });
    await user.click(btn);

    expect(screen.getByRole('button', { name: /Switch to dark theme/i })).toBeInTheDocument();
  });
});
