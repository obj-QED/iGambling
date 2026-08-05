import type { Meta, StoryObj } from '@storybook/react-vite';

import { ActionIcon, Button, ColorSwatch, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { MANTINE_THEME_COLORS } from '@/storybook/helpers/mantineArgTypes';
import { StoryLabFrame } from '@/storybook/helpers/StoryLabFrame';

function PalettePreview() {
  const theme = useMantineTheme();
  const primary = theme.colors[theme.primaryColor] ?? theme.colors.brand;

  return (
    <Stack gap="lg" style={{ color: 'var(--color-text)' }}>
      <Stack gap="xs">
        <Text size="sm" fw={600} c="var(--color-text)">
          Active primary: {theme.primaryColor} (shade{' '}
          {typeof theme.primaryShade === 'number' ? theme.primaryShade : theme.primaryShade.dark})
        </Text>
        <Group gap="xs">
          {primary.map((hex, index) => (
            <Stack key={hex} gap={2} align="center">
              <ColorSwatch color={hex} size={36} />
              <Text size="xs" c="var(--color-text-muted)">
                {index}
              </Text>
            </Stack>
          ))}
        </Group>
      </Stack>

      <Stack gap="xs">
        <Text size="sm" fw={600} c="var(--color-text)">
          Live controls (use toolbar Primary color / shade / Color scheme)
        </Text>
        <Group gap="sm">
          <Button variant="filled">filled</Button>
          <Button variant="light">light</Button>
          <Button variant="outline">outline</Button>
          <Button variant="subtle">subtle</Button>
          <ActionIcon variant="filled" aria-label="plus">
            <IconPlus size={16} />
          </ActionIcon>
          <ActionIcon variant="light" aria-label="plus-light">
            <IconPlus size={16} />
          </ActionIcon>
        </Group>
      </Stack>

      <Stack gap="xs">
        <Text size="sm" fw={600} c="var(--color-text)">
          Named palettes in theme
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
          {MANTINE_THEME_COLORS.map((name) => {
            const shades = theme.colors[name] ?? theme.colors.gray;
            const sample = shades[5];
            return (
              <Group key={name} gap="sm" wrap="nowrap">
                <ColorSwatch color={sample} size={28} />
                <div>
                  <Text size="sm" fw={600} c="var(--color-text)">
                    {name}
                  </Text>
                  <Text size="xs" c="var(--color-text-muted)">
                    {sample}
                  </Text>
                </div>
              </Group>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}

const meta = {
  title: 'Theme/Palette',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Theme palette lab. Toolbar: Primary color, Primary shade, Color scheme (light/dark brand CSS).',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lab: Story = {
  render: () => (
    <StoryLabFrame
      title="Theme palette"
      summary="Switch primary color and shade from the Storybook toolbar. Light/Dark also remaps CSS brand tokens."
      capabilities={[
        'Toolbar → Primary color (brand, gray, cyan, …)',
        'Toolbar → Primary shade (4–8)',
        'Toolbar → Color scheme (light / dark)',
        'Brand CSS palette: assets/theme/mantine/brand/brand-palette.scss',
      ]}
    >
      <PalettePreview />
    </StoryLabFrame>
  ),
};
