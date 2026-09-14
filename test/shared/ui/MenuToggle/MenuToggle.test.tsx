import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { MenuToggle } from '@/shared/ui';

function renderToggle(ui: React.ReactElement) {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      {ui}
    </MantineProvider>,
  );
}

describe('MenuToggle', () => {
  it('reflects opened state via aria-expanded', () => {
    const { rerender } = renderToggle(<MenuToggle opened={false} aria-label="Menu" />);
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');

    rerender(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <MenuToggle opened aria-label="Menu" />
      </MantineProvider>,
    );
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderToggle(<MenuToggle opened={false} aria-label="Menu" onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'Menu' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
