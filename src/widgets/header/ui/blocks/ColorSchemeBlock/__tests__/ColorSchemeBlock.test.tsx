import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { ColorSchemeBlock } from '@/widgets/header/ui/blocks/ColorSchemeBlock/ColorSchemeBlock';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
});

describe('ColorSchemeBlock', () => {
  it('renders theme toggle with accessible label', async () => {
    const user = userEvent.setup();

    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <ColorSchemeBlock item={{ key: 'color_scheme', url: '', name: '' }} />
      </MantineProvider>,
    );

    const button = screen.getByRole('button', { name: 'Toggle color scheme' });
    expect(button).toBeInTheDocument();
    await user.click(button);
  });
});
