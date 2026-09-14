import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { AppDrawer } from '@/shared/ui';

describe('AppDrawer', () => {
  it('sets data-cmf-component and data-cmf-key on the panel', () => {
    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <AppDrawer
          opened
          onClose={vi.fn()}
          data-cmf-component="layout"
          data-cmf-key="sidebar"
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
