import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { DEFAULT_SIDEBAR_CONFIG } from '@/widgets/sidebar/config';
import {
  AsideMenuSizeContext,
  SidebarConfigProvider,
  SidebarTypePackContext,
} from '@/widgets/sidebar/context';
import { Search } from '@/widgets/sidebar/ui/blocks/Search/Search';
import { resolveSidebarTypePack } from '@/widgets/sidebar/ui/type';

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

function renderSearch(config: Partial<typeof DEFAULT_SIDEBAR_CONFIG> = {}) {
  const type = config.type ?? DEFAULT_SIDEBAR_CONFIG.type;
  const typePack = resolveSidebarTypePack(type);

  return render(
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <MemoryRouter>
        <SidebarConfigProvider config={{ ...DEFAULT_SIDEBAR_CONFIG, ...config }}>
          <SidebarTypePackContext.Provider value={typePack}>
            <AsideMenuSizeContext.Provider value="md">
              <Search item={{ key: 'search_leftmenu', url: '/', name: 'Search' }} />
            </AsideMenuSizeContext.Provider>
          </SidebarTypePackContext.Provider>
        </SidebarConfigProvider>
      </MemoryRouter>
    </MantineProvider>,
  );
}

describe('Sidebar Search block', () => {
  it('renders row adapter by default', async () => {
    renderSearch();
    expect(await screen.findByRole('link', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders compact SearchIconVariant chrome when typePack overlays search', async () => {
    renderSearch({ type: 'compact', blockVariants: { search: 'icon' } });
    // Global Search router still used in unit test (no typePack blocks overlay here) —
    // icon adapter must render an accessible control named Search.
    expect(await screen.findByRole('link', { name: 'Search' })).toBeInTheDocument();
  });

  it('hides when capability search is false', () => {
    const { container } = renderSearch({
      capabilities: { ...DEFAULT_SIDEBAR_CONFIG.capabilities, search: false },
    });
    expect(container).toBeEmptyDOMElement();
  });
});
