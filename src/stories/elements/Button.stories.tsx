import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@mantine/core';
import { useArgs } from 'storybook/preview-api';

import { CMF_BUTTON_SIZES, CMF_BUTTON_VARIANTS } from '@/assets/theme/mantine/cmfButtonVars';
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
  mantineCanvasPlaygroundParameters,
  MantineDocsPlayground,
} from '@/storybook/helpers/MantineDocsPlayground';
import { VariantMatrix } from '@/storybook/helpers/VariantMatrix';

const meta = {
  title: 'Elements/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Mantine Button with CMF theme tokens. Use **Playground** in the Canvas tab for live controls; Docs shows **All Variants** only.',
      },
    },
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
  parameters: mantineCanvasPlaygroundParameters,
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
  parameters: {
    docs: {
      description: {
        story: 'Full variant matrix for visual regression and token review.',
      },
    },
  },
  render: () => (
    <VariantMatrix
      items={CMF_BUTTON_VARIANTS}
      columns={4}
      renderItem={(variant) => <Button variant={variant}>{variant}</Button>}
    />
  ),
};
