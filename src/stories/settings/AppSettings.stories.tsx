import type { Meta, StoryObj } from '@storybook/react-vite';

import { Code, Stack, Text } from '@mantine/core';

import { getSettings } from '@/shared/config';
import { createStorybookHeaderMenu, createStorybookSidebarMenu } from '@/storybook/data';
import { StoryLabFrame, StoryLabMeta } from '@/storybook/helpers/StoryLabFrame';
import {
  applyStorybookAppSettings,
  readStorybookAppSettingsGlobals,
  STORYBOOK_APP_SETTINGS_DEFAULTS,
} from '@/storybook/settings';
import { AppHeader } from '@/widgets/header';
import { resolveHeaderConfig } from '@/widgets/header/config/resolve';
import { AppSidebar } from '@/widgets/sidebar';
import { resolveSidebarConfig } from '@/widgets/sidebar/config/resolve';

function HeaderSettingsPreview() {
  const menu = createStorybookHeaderMenu();
  const config = resolveHeaderConfig();
  return <AppHeader menu={menu} config={config} />;
}

function SidebarSettingsPreview() {
  const menu = createStorybookSidebarMenu();
  const config = resolveSidebarConfig();

  return (
    <div
      style={{
        display: 'flex',
        minHeight: 360,
        maxHeight: 520,
        width: '100%',
        maxWidth: 420,
        background: 'var(--color-bg-body)',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <AppSidebar menu={menu} config={config} />
    </div>
  );
}

const meta = {
  title: 'Lab/App Settings',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Live `window.__SETTINGS__` lab for AppHeader / AppSidebar.',
          '',
          '**How to use:** change values in the Storybook **toolbar** (Header *, Aside *, Color scheme). The canvas remounts and re-applies settings — this is not the Controls panel.',
          '',
          'Open **Header** or **Sidebar** stories for a focused shell preview; Overview dumps active globals.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: (_args, context) => {
    applyStorybookAppSettings(context.globals);
    const g = readStorybookAppSettingsGlobals(context.globals);

    return (
      <StoryLabFrame
        title="App settings lab"
        summary="Toolbar globals write into window.__SETTINGS__ before each story. Use Header / Sidebar stories for shell previews."
        howTo="Toolbar → Color scheme · Header layout / type / session · Aside layout / type / width / mock. Then open the Header or Sidebar story."
        capabilities={[
          'Header: layout, type, guest|authenticated session, color_scheme slot',
          'Aside: layout, type, width, mock menu (header + main + footer sections)',
          'Theme: light/dark + primary color from toolbar',
        ]}
      >
        <Stack gap="sm">
          <StoryLabMeta
            items={[
              { label: 'header.layout', value: g.headerLayout },
              { label: 'header.type', value: g.headerType },
              { label: 'aside.type', value: g.asideType },
              { label: 'aside.width', value: `${g.asideWidth}px` },
            ]}
          />
          <details>
            <summary style={{ cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 12 }}>
              Active toolbar JSON
            </summary>
            <Code block mt="xs" style={{ whiteSpace: 'pre-wrap', fontSize: 11 }}>
              {JSON.stringify(g, null, 2)}
            </Code>
          </details>
          <details>
            <summary style={{ cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 12 }}>
              Resolved window.__SETTINGS__
            </summary>
            <Code block mt="xs" style={{ whiteSpace: 'pre-wrap', fontSize: 11 }}>
              {JSON.stringify(getSettings(), null, 2)}
            </Code>
          </details>
          <details>
            <summary style={{ cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 12 }}>
              Storybook defaults (reference)
            </summary>
            <Code block mt="xs" style={{ whiteSpace: 'pre-wrap', fontSize: 11 }}>
              {JSON.stringify(STORYBOOK_APP_SETTINGS_DEFAULTS, null, 2)}
            </Code>
          </details>
        </Stack>
      </StoryLabFrame>
    );
  },
};

export const Header: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'AppHeader shell. Change **Header layout / type / session** and **Color scheme** in the toolbar — preview remounts. Adapters (search/wallet) follow `blockVariants` from settings.',
      },
    },
  },
  render: (_args, context) => {
    applyStorybookAppSettings(context.globals);
    const g = readStorybookAppSettingsGlobals(context.globals);

    return (
      <StoryLabFrame
        title="AppHeader"
        summary="Live header shell from menu mock + resolveHeaderConfig(). Use the toolbar to switch layout, type, auth session and theme."
        howTo="Toolbar → Header layout · Header type · Header session (guest/authenticated) · Color scheme slot · Color scheme. Hover search/wallet to preload adapters."
        capabilities={[
          'layout: container | container-fluid',
          'type: default | classic | dropdown | …',
          'session: guest vs authenticated menu mock',
          'color_scheme slot: toolbar moon/sun in header',
        ]}
      >
        <Stack gap="sm">
          <StoryLabMeta
            items={[
              { label: 'layout', value: g.headerLayout },
              { label: 'type', value: g.headerType },
              { label: 'session', value: g.headerAuth },
              { label: 'color_scheme_slot', value: String(g.headerColorSchemeSlot) },
            ]}
          />
          <div
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              overflow: 'hidden',
              background: 'var(--color-bg-body)',
            }}
          >
            <HeaderSettingsPreview />
          </div>
          <Text size="xs" c="var(--color-text-muted)">
            Tip: switch Color scheme in the toolbar to verify light/dark contrast on controls.
          </Text>
        </Stack>
      </StoryLabFrame>
    );
  },
};

export const Sidebar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'AppSidebar with **header**, **main** (scroll), and **footer** regions from the mock (`sections.key` = header | left | footer). Toggle Aside type/width in the toolbar.',
      },
    },
  },
  render: (_args, context) => {
    applyStorybookAppSettings(context.globals);
    const g = readStorybookAppSettingsGlobals(context.globals);

    return (
      <StoryLabFrame
        title="AppSidebar"
        summary="Aside shell with header chrome, scrollable nav, and footer links. Mock sections: header · left · footer."
        howTo="Toolbar → Aside layout / type / width / mock menu · Color scheme. Regions header+main+footer are on by default."
        capabilities={[
          'header region: logo + account',
          'main region: scrollable left menu',
          'footer region: support / terms',
          'type: default (rich) vs compact (icon rail)',
        ]}
      >
        <Stack gap="sm">
          <StoryLabMeta
            items={[
              { label: 'layout', value: g.asideLayout },
              { label: 'type', value: g.asideType },
              { label: 'width', value: `${g.asideWidth}px` },
              { label: 'mock', value: String(g.asideMockMenu) },
            ]}
          />
          <SidebarSettingsPreview />
        </Stack>
      </StoryLabFrame>
    );
  },
};
