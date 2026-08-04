import type { Meta, StoryObj } from '@storybook/react-vite';

import { Code, List, Stack, Text, Title } from '@mantine/core';

const meta = {
  title: 'Guide/How to use',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'How to explore visuals in Storybook: toolbar globals (theme + app settings) and per-story Controls (dropdowns).',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <Stack gap="lg" maw={720}>
      <Stack gap={4}>
        <Title order={2}>Storybook lab</Title>
        <Text size="sm" c="dimmed">
          Change appearance with toolbar dropdowns and the Controls panel. Every Playground /
          Special Block story is built for live preview.
        </Text>
      </Stack>

      <Stack gap="xs">
        <Title order={4}>1. Toolbar (top)</Title>
        <List size="sm" spacing={4}>
          <List.Item>
            <Text span fw={600}>
              Primary color / Primary shade
            </Text>{' '}
            — Mantine theme palette for filled / light / outline controls
          </List.Item>
          <List.Item>
            <Text span fw={600}>
              Color scheme
            </Text>{' '}
            — Light / Dark (also switches CSS brand palette)
          </List.Item>
          <List.Item>
            <Text span fw={600}>
              Header / Aside
            </Text>{' '}
            — layout, type, session, width, mock menu (maps to `window.__SETTINGS__`)
          </List.Item>
        </List>
      </Stack>

      <Stack gap="xs">
        <Title order={4}>2. Controls panel (right)</Title>
        <Text size="sm">
          Open <Code>Controls</Code>. Most knobs are <Code>select</Code> dropdowns. Value{' '}
          <Code>— none —</Code> means “do not override” (prop omitted).
        </Text>
      </Stack>

      <Stack gap="xs">
        <Title order={4}>3. Where to go</Title>
        <List size="sm" spacing={4}>
          <List.Item>
            <Code>Develop / AI Review Brief</Code> — public architecture pack for external AI agents
          </List.Item>
          <List.Item>
            <Code>Theme / Palette</Code> — swatches + live Button / ActionIcon with current primary
          </List.Item>
          <List.Item>
            <Code>Elements / Button</Code> &amp; <Code>ActionIcon</Code> — variant, color, size,
            radius, icon cascade
          </List.Item>
          <List.Item>
            <Code>Widgets / Header / Special Blocks</Code> — one story tab per block (Search,
            Wallet, …) with adapter + item knobs
          </List.Item>
          <List.Item>
            <Code>Widgets / Sidebar / Special Blocks</Code> — Logo, Search, Timer, Wheel
          </List.Item>
          <List.Item>
            <Code>Settings / App</Code> — dump of active toolbar → `__SETTINGS__`
          </List.Item>
        </List>
      </Stack>
    </Stack>
  ),
};
