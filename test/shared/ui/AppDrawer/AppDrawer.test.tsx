import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { AppDrawer } from '@/shared/ui';

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

describe('AppDrawer', () => {
  it('sets data-cmf-component and data-cmf-key on the panel', () => {
    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <AppDrawer
          opened
          onClose={vi.fn()}
          cmfComponent="layout"
          cmfKey="sidebar"
          withCloseButton={false}
        >
          <div>drawer body</div>
        </AppDrawer>
      </MantineProvider>,
    );

    const panel = document.querySelector('[data-cmf-component="layout"][data-cmf-key="sidebar"]');
    expect(panel).not.toBeNull();
    expect(screen.getByText('drawer body')).toBeInTheDocument();
  });
});
