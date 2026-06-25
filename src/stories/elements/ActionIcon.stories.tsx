import type { Meta, StoryObj } from '@storybook/react-vite';

import { ActionIcon, Group, Stack, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import {
  CMF_ACTION_ICON_SIZES,
  CMF_ACTION_ICON_VARIANTS,
  type CmfActionIconSize,
  type CmfActionIconVariant,
} from '@/assets/theme/mantine/cmfActionIconVars';
import { cmfActionIconScopeOverrideStyle } from '@/storybook/helpers/cmfScopeOverrides';
import {
  mantineBooleanArgType,
  mantineColorArgType,
  mantinePlaygroundParameters,
  mantineRadiusArgType,
  mantineSizeArgType,
  mantineTextArgType,
  mantineVariantArgType,
} from '@/storybook/helpers/mantineArgTypes';
import { MantinePlayground } from '@/storybook/helpers/MantinePlayground';
import { VariantMatrix } from '@/storybook/helpers/VariantMatrix';
import { HEADER_MENU_ACTION_ICON_SIZE } from '@/widgets/header/ui/menu/icons/iconProps';

const STATE_VARIANTS = [
  'filled',
  'outline',
  'gradient',
  'hero',
] as const satisfies readonly CmfActionIconVariant[];
const HERO_VARIANTS = [
  'hero',
  'hero-light',
  'hero-outline',
] as const satisfies readonly CmfActionIconVariant[];
const HEADER_SIZES = ['md', 'input-sm'] as const satisfies readonly CmfActionIconSize[];

function DemoGlyph() {
  return <IconPlus size={16} stroke={2} />;
}

const meta = {
  title: 'Elements/ActionIcon',
  component: ActionIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: mantineVariantArgType(CMF_ACTION_ICON_VARIANTS),
    color: mantineColorArgType(),
    size: mantineSizeArgType(CMF_ACTION_ICON_SIZES),
    radius: mantineRadiusArgType(),
    disabled: mantineBooleanArgType(),
    loading: mantineBooleanArgType(),
    'aria-label': mantineTextArgType('aria-label'),
  },
  args: {
    variant: 'default',
    color: 'brand',
    size: 'md',
    radius: 'md',
    disabled: false,
    loading: false,
    'aria-label': 'action',
  },
} satisfies Meta<typeof ActionIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: mantinePlaygroundParameters,
  render: (args) => (
    <MantinePlayground>
      <ActionIcon {...args}>
        <DemoGlyph />
      </ActionIcon>
    </MantinePlayground>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <VariantMatrix
      items={CMF_ACTION_ICON_VARIANTS}
      columns={4}
      renderItem={(variant) => (
        <ActionIcon variant={variant} aria-label={variant}>
          <DemoGlyph />
        </ActionIcon>
      )}
    />
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Group gap="sm" align="flex-end">
      {CMF_ACTION_ICON_SIZES.map((size) => (
        <ActionIcon key={size} size={size} variant="filled" aria-label={size}>
          <DemoGlyph />
        </ActionIcon>
      ))}
    </Group>
  ),
};

export const HeaderToolbarSizes: Story = {
  render: () => (
    <Group gap="sm" align="flex-end">
      {HEADER_SIZES.map((size) => (
        <ActionIcon key={size} size={size} variant="default" aria-label={size}>
          <DemoGlyph />
        </ActionIcon>
      ))}
      <Text size="xs" c="dimmed">
        header default: {HEADER_MENU_ACTION_ICON_SIZE}
      </Text>
    </Group>
  ),
};

export const HeroVariants: Story = {
  render: () => (
    <Group gap="sm">
      {HERO_VARIANTS.map((variant) => (
        <ActionIcon key={variant} variant={variant} aria-label={variant}>
          <DemoGlyph />
        </ActionIcon>
      ))}
    </Group>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="lg">
      {STATE_VARIANTS.map((variant) => (
        <Stack key={variant} gap="xs">
          <Text size="sm" fw={600}>
            {variant}
          </Text>
          <Group gap="sm">
            <ActionIcon variant={variant} aria-label={`${variant} default`}>
              <DemoGlyph />
            </ActionIcon>
            <ActionIcon variant={variant} disabled aria-label={`${variant} disabled`}>
              <DemoGlyph />
            </ActionIcon>
            <ActionIcon variant={variant} loading aria-label={`${variant} loading`}>
              <DemoGlyph />
            </ActionIcon>
          </Group>
        </Stack>
      ))}
    </Stack>
  ),
};

export const CmfScopeOverride: Story = {
  render: () => (
    <Stack gap="sm" style={cmfActionIconScopeOverrideStyle} data-cmf-action-icon-scope="storybook">
      <Title order={5}>CMF scope override (filled / outline)</Title>
      <Group gap="sm">
        <ActionIcon variant="filled" aria-label="filled">
          <DemoGlyph />
        </ActionIcon>
        <ActionIcon variant="outline" aria-label="outline">
          <DemoGlyph />
        </ActionIcon>
      </Group>
    </Stack>
  ),
};
