import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack, Title } from '@mantine/core';

import { createHeaderMenuFixture } from '@/storybook/data';
import { AppHeader } from '@/widgets/header';
import { DEFAULT_HEADER_CONFIG } from '@/widgets/header/config/defaults';

const menu = createHeaderMenuFixture();

const meta = {
  title: 'Widgets/Header/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    menu,
    config: DEFAULT_HEADER_CONFIG,
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ContainerFluid: Story = {
  args: {
    config: {
      ...DEFAULT_HEADER_CONFIG,
      layout: 'container-fluid',
    },
  },
};

export const CustomType: Story = {
  args: {
    config: {
      ...DEFAULT_HEADER_CONFIG,
      type: 'custom',
    },
  },
};

export const DarkToolbarPreview: Story = {
  render: (args) => (
    <Stack gap="md">
      <Title order={4}>Header toolbar (mock menu)</Title>
      <AppHeader {...args} />
    </Stack>
  ),
};
