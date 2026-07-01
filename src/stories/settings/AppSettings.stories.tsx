import type { Meta, StoryObj } from '@storybook/react-vite';

import { Code, Stack, Text, Title } from '@mantine/core';

import { getSettings } from '@/shared/config';
import { createStorybookHeaderMenu, createStorybookSidebarMenu } from '@/storybook/data';
import {
  applyStorybookAppSettings,
  readStorybookAppSettingsGlobals,
  STORYBOOK_APP_SETTINGS_DEFAULTS,
} from '@/storybook/settings';
import { AppHeader } from '@/widgets/header';
import { resolveHeaderConfig } from '@/widgets/header/config/resolve';
import { AppSidebar } from '@/widgets/sidebar';
import { resolveSidebarConfig } from '@/widgets/sidebar/config/resolve';

function SettingsJsonPreview() {
  const settings = getSettings();

  return (
    <Code block style={{ whiteSpace: 'pre-wrap' }}>
      {JSON.stringify(settings, null, 2)}
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
    <div style={{ display: 'flex', minHeight: 480, background: 'var(--color-bg-body)' }}>
      <AppSidebar menu={menu} config={config} />
    </div>
  );
}

const meta = {
  title: 'Settings/App',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Runtime visual config from `window.__SETTINGS__`. Toolbar controls header, aside, and color scheme — values apply before each story. Theme bridge: `@/assets/theme` (`mantine/theme/mantineTheme.ts`).',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: (_args, context) => {
    applyStorybookAppSettings(context.globals);
    const globals = readStorybookAppSettingsGlobals(context.globals);

    return (
      <Stack gap="md">
        <Title order={3}>App settings (Storybook)</Title>
        <Text c="dimmed" size="sm">
          Toolbar globals map to `window.__SETTINGS__`. Production defaults live in
          `src/assets/settings/index.js`; Storybook uses `src/storybook/settings/`.
        </Text>
        <Stack gap="xs">
          <Text fw={600} size="sm">
            Active toolbar values
          </Text>
          <Code block>{JSON.stringify(globals, null, 2)}</Code>
        </Stack>
        <Stack gap="xs">
          <Text fw={600} size="sm">
            Resolved `window.__SETTINGS__`
          </Text>
          <SettingsJsonPreview />
        </Stack>
        <Stack gap="xs">
          <Text fw={600} size="sm">
            Production defaults (reference)
          </Text>
          <Code block>{JSON.stringify(STORYBOOK_APP_SETTINGS_DEFAULTS, null, 2)}</Code>
        </Stack>
      </Stack>
    );
  },
};

export const HeaderPreview: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (_args, context) => {
    applyStorybookAppSettings(context.globals);

    return (
      <Stack gap="md" p="md">
        <Title order={4}>Header with current settings</Title>
        <HeaderSettingsPreview />
      </Stack>
    );
  },
};

export const SidebarPreview: Story = {
  parameters: {
    layout: 'padded',
  },
  render: (_args, context) => {
    applyStorybookAppSettings(context.globals);

    return (
      <Stack gap="md">
        <Title order={4}>Sidebar with current settings</Title>
        <SidebarSettingsPreview />
      </Stack>
    );
  },
};
