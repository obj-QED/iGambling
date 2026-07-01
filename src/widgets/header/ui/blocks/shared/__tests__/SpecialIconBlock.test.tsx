import type { ComponentProps } from 'react';

import { MantineProvider } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { DEFAULT_HEADER_CONFIG } from '@/widgets/header/config/defaults';
import { ConfigProvider } from '@/widgets/header/context/provider';
import { SpecialIconBlock } from '@/widgets/header/ui/blocks/shared/SpecialIconBlock';
import { HEADER_TABLER_ICON_PROPS } from '@/widgets/header/ui/menu/icons/iconProps';

function renderSpecialIconBlock(props: ComponentProps<typeof SpecialIconBlock>) {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <MemoryRouter>
        <ConfigProvider config={DEFAULT_HEADER_CONFIG}>
          <SpecialIconBlock {...props} />
        </ConfigProvider>
      </MemoryRouter>
    </MantineProvider>,
  );
}

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
    const { container } = renderSpecialIconBlock({
      item: { key: 'notification', url: '', name: '' },
      fallbackIcon: <IconSearch {...HEADER_TABLER_ICON_PROPS} />,
    });

    expect(container.querySelector('[data-menu-key="notification"]')).toBeNull();
  });

  it('hides action icon when img fails to load', () => {
    const { container } = renderSpecialIconBlock({
      item: { key: 'notification', url: '/notification', name: '', img: '/missing.png' },
      fallbackIcon: <IconSearch {...HEADER_TABLER_ICON_PROPS} />,
    });

    const image = screen.getByRole('img', { name: 'notification' });
    fireEvent.error(image);

    expect(container.querySelector('[data-menu-key="notification"]')).toBeNull();
  });
});
