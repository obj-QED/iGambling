import type { Meta, StoryObj } from '@storybook/react-vite';

import { Code, Stack, Text, Title } from '@mantine/core';

import { getSettings } from '@/shared/config';
import { createStorybookHeaderMenu, createStorybookSidebarMenu } from '@/storybook/data';
import { StoryLabFrame } from '@/storybook/helpers/StoryLabFrame';
import {
  applyStorybookAppSettings,
  readStorybookAppSettingsGlobals,
  STORYBOOK_APP_SETTINGS_DEFAULTS,
} from '@/storybook/settings';
import { AppHeader } from '@/widgets/header';
import { resolveHeaderConfig } from '@/widgets/header/config/resolve';
import { AppSidebar } from '@/widgets/sidebar';
import { resolveSidebarConfig } from '@/widgets/sidebar/config/resolve';

function ActiveGlobalsPanel({ globals }: { globals: Record<string, unknown> }) {
  const parsed = readStorybookAppSettingsGlobals(globals);
  return (
    <Code block style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>
      {JSON.stringify(parsed, null, 2)}
    </Code>
  );
}

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
        minHeight: 480,
        width: '100%',
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
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Live `window.__SETTINGS__` lab. Use the **toolbar** (Header layout / type / session, Aside *, Color scheme). Preview remounts when toolbar values change.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: (_args, context) => {
    applyStorybookAppSettings(context.globals);

    return (
      <StoryLabFrame
        title="App settings lab"
        summary="Toolbar globals write into window.__SETTINGS__ before each story. Use Header / Sidebar previews to see the effect."
        howTo="Toolbar: Color scheme, Header layout/type/session, Aside layout/type/width/mock. Not the Controls panel."
        capabilities={[
          'Header layout / type / session (guest vs token) / color_scheme slot',
          'Aside layout / type / width / mock menu',
          'Color scheme light/dark (brand palette + readable shell)',
        ]}
      >
        <Stack gap="md">
          <Stack gap={4}>
            <Title order={5}>Active toolbar → settings</Title>
            <ActiveGlobalsPanel globals={context.globals} />
          </Stack>
          <Stack gap={4}>
            <Title order={5}>Resolved window.__SETTINGS__</Title>
            <Code block style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>
              {JSON.stringify(getSettings(), null, 2)}
            </Code>
          </Stack>
          <Stack gap={4}>
            <Title order={5}>Storybook defaults (reference)</Title>
            <Code block style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>
              {JSON.stringify(STORYBOOK_APP_SETTINGS_DEFAULTS, null, 2)}
            </Code>
          </Stack>
        </Stack>
      </StoryLabFrame>
    );
  },
};

export const Header: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (_args, context) => {
    applyStorybookAppSettings(context.globals);
    const g = readStorybookAppSettingsGlobals(context.globals);

    return (
      <StoryLabFrame
        title="Header preview"
        summary="AppHeader with menu mock + resolveHeaderConfig() from current toolbar settings."
        howTo="Change Header layout / type / session / color-scheme slot and Color scheme in the toolbar — canvas remounts."
      >
        <Stack gap="sm">
          <Text size="sm">
            layout=<Code>{g.headerLayout}</Code> type=<Code>{g.headerType}</Code> session=
            <Code>{g.headerAuth}</Code> slot=
            <Code>{String(g.headerColorSchemeSlot)}</Code>
          </Text>
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
        </Stack>
      </StoryLabFrame>
    );
  },
};

export const Sidebar: Story = {
  render: (_args, context) => {
    applyStorybookAppSettings(context.globals);
    const g = readStorybookAppSettingsGlobals(context.globals);

    return (
      <StoryLabFrame
        title="Sidebar preview"
        summary="AppSidebar with mock menu + resolveSidebarConfig() from current toolbar settings."
        howTo="Change Aside layout / type / width / mock menu and Color scheme in the toolbar."
      >
        <Stack gap="sm">
          <Text size="sm">
            layout=<Code>{g.asideLayout}</Code> type=<Code>{g.asideType}</Code> width=
            <Code>{g.asideWidth}px</Code> mock=
            <Code>{String(g.asideMockMenu)}</Code>
          </Text>
          <SidebarSettingsPreview />
        </Stack>
      </StoryLabFrame>
    );
  },
};
