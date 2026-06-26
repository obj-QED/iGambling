import type { Meta, StoryObj } from '@storybook/react-vite';

import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useArgs } from 'storybook/preview-api';

import {
  CMF_ACTION_ICON_SIZES,
  CMF_ACTION_ICON_VARIANTS,
} from '@/assets/theme/mantine/cmfActionIconVars';
import {
  elementDocsPreviewParameters,
  elementPlaygroundParameters,
} from '@/storybook/helpers/elementStoryParameters';
import {
  mantineBooleanArgType,
  mantineColorArgType,
  mantineRadiusArgType,
  mantineSizeArgType,
  mantineTextArgType,
  mantineVariantArgType,
} from '@/storybook/helpers/mantineArgTypes';
import {
  ACTION_ICON_DOCS_PLAYGROUND_FIELDS,
  MantineDocsPlayground,
  mantineDocsPlaygroundParameters,
} from '@/storybook/helpers/MantineDocsPlayground';
import { VariantMatrix } from '@/storybook/helpers/VariantMatrix';

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

export const Default: Story = {
  parameters: elementDocsPreviewParameters,
  render: (args) => (
    <ActionIcon {...args}>
      <DemoGlyph />
    </ActionIcon>
  ),
};

export const AllVariants: Story = {
  parameters: {
    ...elementDocsPreviewParameters,
    docs: {
      ...elementDocsPreviewParameters.docs,
      description: {
        story: 'Variant matrix for visual regression and token review.',
      },
    },
  },
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

export const Playground: Story = {
  parameters: {
    ...elementPlaygroundParameters,
    controls: mantineDocsPlaygroundParameters.controls,
  },
  render: function ActionIconPlayground() {
    const [args, updateArgs] = useArgs<typeof meta.args>();

    return (
      <MantineDocsPlayground
        args={args}
        fields={ACTION_ICON_DOCS_PLAYGROUND_FIELDS}
        onChange={updateArgs}
      >
        <ActionIcon {...args}>
          <DemoGlyph />
        </ActionIcon>
      </MantineDocsPlayground>
    );
  },
};
