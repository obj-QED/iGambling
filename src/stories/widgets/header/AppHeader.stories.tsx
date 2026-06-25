import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack, Title } from '@mantine/core';

import { resolveStorybookHeaderProps } from '@/storybook/helpers/resolveStorybookHeaderProps';
import { AppHeader } from '@/widgets/header';

const meta = {
  title: 'Widgets/Header/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { menu, config } = resolveStorybookHeaderProps();
    return <AppHeader menu={menu} config={config} />;
  },
};

export const ContainerFluid: Story = {
  render: () => {
    const { menu, config } = resolveStorybookHeaderProps();
    return <AppHeader menu={menu} config={{ ...config, layout: 'container-fluid' }} />;
  },
};

export const CustomType: Story = {
  render: () => {
    const { menu, config } = resolveStorybookHeaderProps();
    return <AppHeader menu={menu} config={{ ...config, type: 'custom' }} />;
  },
};

export const DarkToolbarPreview: Story = {
  render: () => {
    const { menu, config } = resolveStorybookHeaderProps();

    return (
      <Stack gap="md">
        <Title order={4}>Header toolbar (mock menu + settings)</Title>
        <AppHeader menu={menu} config={config} />
      </Stack>
    );
  },
};
