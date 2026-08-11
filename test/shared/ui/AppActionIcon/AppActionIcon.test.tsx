import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { AppActionIcon } from '@/shared/ui';

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

function renderActionIcon(ui: React.ReactElement) {
  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>,
  );
}

describe('AppActionIcon', () => {
  it('returns null when hidden', () => {
    renderActionIcon(
      <AppActionIcon name="Home" img="/icon.svg" hidden>
        <span>icon</span>
      </AppActionIcon>,
    );

    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('returns null when there is no img, name, or children', () => {
    renderActionIcon(<AppActionIcon href="/home">{null}</AppActionIcon>);

    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('renders when children are present without name/img (native trigger)', () => {
    renderActionIcon(
      <AppActionIcon native aria-label="Open menu">
        <span>icon</span>
      </AppActionIcon>,
    );

    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('renders button action icon when href is valid', () => {
    renderActionIcon(
      <AppActionIcon name="Home" img="/icon.svg" href="/home" aria-label="Home">
        <span>icon</span>
      </AppActionIcon>,
    );

    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeNull();
  });
});
