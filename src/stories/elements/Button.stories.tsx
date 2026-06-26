import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { useArgs } from 'storybook/preview-api';

import {
  CMF_BUTTON_SIZES,
  CMF_BUTTON_VARIANTS,
  type CmfButtonSize,
  type CmfButtonVariant,
} from '@/assets/theme/mantine/cmfButtonVars';
import { cmfButtonScopeOverrideStyle } from '@/storybook/helpers/cmfScopeOverrides';
import {
  mantineBooleanArgType,
  mantineColorArgType,
  mantineRadiusArgType,
  mantineSizeArgType,
  mantineTextArgType,
  mantineVariantArgType,
} from '@/storybook/helpers/mantineArgTypes';
import {
  BUTTON_DOCS_PLAYGROUND_FIELDS,
  MantineDocsPlayground,
  mantineDocsPlaygroundParameters,
} from '@/storybook/helpers/MantineDocsPlayground';
import { VariantMatrix } from '@/storybook/helpers/VariantMatrix';

const STATE_VARIANTS = [
  'filled',
  'outline',
  'gradient',
  'hero',
] as const satisfies readonly CmfButtonVariant[];
const HERO_VARIANTS = [
  'hero',
  'hero-light',
  'hero-outline',
] as const satisfies readonly CmfButtonVariant[];

const meta = {
  title: 'Elements/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: mantineVariantArgType(CMF_BUTTON_VARIANTS),
    color: mantineColorArgType(),
    size: mantineSizeArgType(CMF_BUTTON_SIZES),
    radius: mantineRadiusArgType(),
    disabled: mantineBooleanArgType(),
    loading: mantineBooleanArgType(),
    fullWidth: mantineBooleanArgType('Layout'),
    children: mantineTextArgType('children'),
  },
  args: {
    children: 'Button',
    variant: 'filled',
    color: 'brand',
    size: 'md',
    radius: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: mantineDocsPlaygroundParameters,
  render: function ButtonPlayground() {
    const [args, updateArgs] = useArgs<typeof meta.args>();

    return (
      <MantineDocsPlayground
        args={args}
        fields={BUTTON_DOCS_PLAYGROUND_FIELDS}
        onChange={updateArgs}
      >
        <Button {...args} />
      </MantineDocsPlayground>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <VariantMatrix
      items={CMF_BUTTON_VARIANTS}
      columns={4}
      renderItem={(variant) => <Button variant={variant}>{variant}</Button>}
    />
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Group gap="sm" align="flex-end">
      {CMF_BUTTON_SIZES.map((size) => (
        <Button key={size} size={size} variant="filled">
          {size}
        </Button>
      ))}
    </Group>
  ),
};

export const HeroVariants: Story = {
  render: () => (
    <Group gap="sm">
      {HERO_VARIANTS.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
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
            <Button variant={variant}>default</Button>
            <Button variant={variant} disabled>
              disabled
            </Button>
            <Button variant={variant} loading>
              loading
            </Button>
            <Button variant={variant} disabled loading>
              disabled+loading
            </Button>
          </Group>
          <Button variant={variant} fullWidth>
            fullWidth
          </Button>
        </Stack>
      ))}
    </Stack>
  ),
};

export const CmfScopeOverride: Story = {
  render: () => (
    <Stack gap="sm" style={cmfButtonScopeOverrideStyle} data-cmf-button-scope="storybook">
      <Title order={5}>CMF scope override (filled / outline)</Title>
      <Group gap="sm">
        <Button variant="filled">filled</Button>
        <Button variant="outline">outline</Button>
      </Group>
    </Stack>
  ),
};

export const TypedVariant: Story = {
  args: {
    variant: 'outline' satisfies CmfButtonVariant,
    size: 'sm' satisfies CmfButtonSize,
    children: 'typed',
  },
};
