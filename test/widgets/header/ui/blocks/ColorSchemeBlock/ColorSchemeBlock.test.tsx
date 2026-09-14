import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { DEFAULT_HEADER_CONFIG } from '@/widgets/header/config/defaults';
import { ConfigProvider } from '@/widgets/header/context/provider';
import { ColorSchemeBlock } from '@/widgets/header/ui/blocks/ColorSchemeBlock/ColorSchemeBlock';

describe('ColorSchemeBlock', () => {
  it('toggles color scheme and swaps icon', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <ConfigProvider config={DEFAULT_HEADER_CONFIG}>
          <ColorSchemeBlock item={{ key: 'color_scheme', url: '', name: '' }} />
        </ConfigProvider>
      </MantineProvider>,
    );

    const button = screen.getByRole('button', { name: 'Toggle color scheme' });
    expect(button).toBeInTheDocument();
    expect(container.querySelector('.tabler-icon-sun-high')).toBeTruthy();

    await user.click(button);

    expect(container.querySelector('.tabler-icon-moon')).toBeTruthy();
    expect(container.querySelector('.tabler-icon-sun-high')).toBeNull();
  });
});
