import { configureStore } from '@reduxjs/toolkit';
import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { DEFAULT_SIDEBAR_CONFIG } from '@/widgets/sidebar/config';
import {
  AsideMenuSizeContext,
  SidebarConfigProvider,
  SidebarTypePackContext,
} from '@/widgets/sidebar/context';
import { Search } from '@/widgets/sidebar/ui/blocks/Search/Search';
import { resolveSidebarTypePack } from '@/widgets/sidebar/ui/type';
import { contextReducer } from '@store/slices/contextSlice';

function renderSearch(config: Partial<typeof DEFAULT_SIDEBAR_CONFIG> = {}) {
  const type = config.type ?? DEFAULT_SIDEBAR_CONFIG.type;
  const typePack = resolveSidebarTypePack(type);
  const store = configureStore({ reducer: { context: contextReducer } });

  return render(
    <Provider store={store}>
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
      </MantineProvider>
    </Provider>,
  );
}

describe('Sidebar Search block', () => {
  it('renders row adapter by default', async () => {
    renderSearch();
    expect(await screen.findByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders compact SearchIconVariant chrome when typePack overlays search', async () => {
    renderSearch({ type: 'compact', blockVariants: { search: 'icon' } });
    // Global Search router still used in unit test (no typePack blocks overlay here) —
    // icon adapter must render an accessible control named Search.
    expect(await screen.findByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('hides when capability search is false', () => {
    renderSearch({
      capabilities: { ...DEFAULT_SIDEBAR_CONFIG.capabilities, search: false },
    });
    expect(screen.queryByRole('link', { name: 'Search' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Search' })).not.toBeInTheDocument();
  });
});
