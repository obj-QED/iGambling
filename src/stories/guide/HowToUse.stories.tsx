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
          'How to explore visuals in Storybook: toolbar globals (theme + app settings) and per-story Controls.',
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
          Change appearance with toolbar dropdowns and the Controls panel. Start at{' '}
          <Code>Develop / Theme and Styles</Code> for a live brand preview.
        </Text>
      </Stack>

      <Stack gap="xs">
        <Title order={4}>1. Toolbar (top)</Title>
        <List size="sm" spacing={4}>
          <List.Item>
            <Text span fw={600}>
              Color scheme
            </Text>{' '}
            — Light / Dark. Syncs <Code>data-theme</Code> + CSS <Code>color-scheme</Code> so brand
            palettes and <Code>light-dark()</Code> tokens update.
          </List.Item>
          <List.Item>
            <Text span fw={600}>
              Primary shade
            </Text>{' '}
            — Mantine primaryShade (4–8). Useful with brand palette.
          </List.Item>
          <List.Item>
            <Text span fw={600}>
              Primary color
            </Text>{' '}
            — Mantine <Code>theme.primaryColor</Code>. CMF cascade often pins <Code>brand-*</Code>{' '}
            CSS vars — brand Button paint may not follow this control.
          </List.Item>
          <List.Item>
            <Text span fw={600}>
              Header / Aside
            </Text>{' '}
            — layout, type, session, width, mock menu (maps to <Code>window.__SETTINGS__</Code>)
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
            <Code>Develop / Theme and Styles</Code> — live Button / ActionIcon + how-to test visuals
          </List.Item>
          <List.Item>
            <Code>Develop / Architecture</Code> — pipeline + honest Header migration status
          </List.Item>
          <List.Item>
            <Code>Theme / Palette</Code> — swatches under current scheme
          </List.Item>
          <List.Item>
            <Code>Elements / Button</Code> &amp; <Code>ActionIcon</Code> — Playground + Icon Cascade
            (CmfIcon media)
          </List.Item>
          <List.Item>
            <Code>Widgets / Header|Sidebar / Special Blocks</Code> — adapter / item knobs
          </List.Item>
          <List.Item>
            <Code>Settings / App</Code> — dump of active toolbar → <Code>__SETTINGS__</Code>
          </List.Item>
        </List>
      </Stack>
    </Stack>
  ),
};
