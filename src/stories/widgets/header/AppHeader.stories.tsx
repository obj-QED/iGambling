import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack, Title } from '@mantine/core';

import { resolveStorybookHeaderProps } from '@/storybook/helpers/resolveStorybookHeaderProps';
import { AppHeader } from '@/widgets/header';

const baseProps = resolveStorybookHeaderProps();

const meta = {
  title: 'Widgets/Header/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: baseProps,
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ContainerFluid: Story = {
  args: {
    config: { ...baseProps.config, layout: 'container-fluid' },
  },
};

export const CustomType: Story = {
  args: {
    config: { ...baseProps.config, type: 'custom' },
  },
};

export const DarkToolbarPreview: Story = {
  render: (args) => (
    <Stack gap="md">
      <Title order={4}>Header toolbar (mock menu + settings)</Title>
      <AppHeader {...args} />
    </Stack>
  ),
};
