import { MantineProvider } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme/mantine/mantineTheme';
import { SpecialIconBlock } from '@/widgets/header/ui/blocks/shared/SpecialIconBlock';
import { HEADER_TABLER_ICON_PROPS } from '@/widgets/header/ui/menu/icons/iconProps';

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

describe('SpecialIconBlock', () => {
  it('does not render without name and img', () => {
    const { container } = render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <MemoryRouter>
          <SpecialIconBlock
            item={{ key: 'notification', url: '', name: '' }}
            fallbackIcon={<IconSearch {...HEADER_TABLER_ICON_PROPS} />}
          />
        </MemoryRouter>
      </MantineProvider>,
    );

    expect(container.querySelector('[data-menu-key="notification"]')).toBeNull();
  });

  it('shows photo fallback when img fails to load', () => {
    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <MemoryRouter>
          <SpecialIconBlock
            item={{ key: 'notification', url: '/notification', name: '', img: '/missing.svg' }}
            fallbackIcon={<IconSearch {...HEADER_TABLER_ICON_PROPS} />}
          />
        </MemoryRouter>
      </MantineProvider>,
    );

    const image = screen.getByRole('img', { name: 'notification' });
    fireEvent.error(image);

    expect(document.querySelector('svg.tabler-icon')).toBeTruthy();
  });
});
