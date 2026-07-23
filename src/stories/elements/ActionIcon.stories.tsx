import type { Meta, StoryObj } from '@storybook/react-vite';

import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useArgs } from 'storybook/preview-api';

import {
  CMF_ACTION_ICON_SIZES,
  CMF_ACTION_ICON_VARIANTS,
  MANTINE_ACTION_ICON_VARIANTS,
} from '@/assets/theme';
import { CmfIcon } from '@/shared/ui/CmfIcon';
import {
  cmfControlIconCascadeStyle,
  cmfIconCascadeStyle,
} from '@/storybook/helpers/cmfScopeOverrides';
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

const ACTION_ICON_STORY_VARIANTS = [
  ...MANTINE_ACTION_ICON_VARIANTS,
  ...CMF_ACTION_ICON_VARIANTS,
] as const;

const STORYBOOK_ICON = '/uploads/jlogo.webp';

type ActionIconStoryArgs = {
  variant?: (typeof ACTION_ICON_STORY_VARIANTS)[number];
  color?: string;
  size?: (typeof CMF_ACTION_ICON_SIZES)[number];
  radius?: string;
  disabled?: boolean;
  loading?: boolean;
  'aria-label'?: string;
  iconScale?: string;
  iconAspect?: string;
};

function DemoGlyph() {
  return <IconPlus size={16} stroke={2} />;
}

function DemoCmfIcon({ alt = 'demo' }: { alt?: string }) {
  return <CmfIcon src={STORYBOOK_ICON} alt={alt} shape="square" radius="sm" />;
}

const meta = {
  title: 'Elements/ActionIcon',
  component: ActionIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Mantine ActionIcon + CMF cascade. Icon size: `--cmf-action-icon[-{scope}]-icon-{scale|aspect|width|height}` → `--cmf-icon-*` → `--ai-size` × scale × aspect.',
      },
    },
  },
  argTypes: {
    variant: mantineVariantArgType(ACTION_ICON_STORY_VARIANTS),
    color: mantineColorArgType(),
    size: mantineSizeArgType(CMF_ACTION_ICON_SIZES),
    radius: mantineRadiusArgType(),
    disabled: mantineBooleanArgType(),
    loading: mantineBooleanArgType(),
    'aria-label': mantineTextArgType('aria-label'),
    iconScale: mantineVariantArgType(['0.5', '0.7', '1'] as const, 'Icon'),
    iconAspect: mantineVariantArgType(['1', '1.5', '2'] as const, 'Icon'),
  },
  args: {
    variant: 'default',
    color: 'brand',
    size: 'md',
    radius: 'md',
    disabled: false,
    loading: false,
    'aria-label': 'action',
    iconScale: '0.7',
    iconAspect: '1',
  },
} satisfies Meta<typeof ActionIcon & ActionIconStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: elementDocsPreviewParameters,
  render: (args) => {
    const { iconScale, iconAspect, ...iconArgs } = args as ActionIconStoryArgs;
    void iconScale;
    void iconAspect;
    return (
      <ActionIcon {...iconArgs}>
        <DemoGlyph />
      </ActionIcon>
    );
  },
};

export const WithCmfIcon: Story = {
  parameters: {
    ...elementDocsPreviewParameters,
    docs: {
      description: {
        story:
          'CmfIcon media — sized from `--ai-size` × scale × aspect (not Tabler stroke glyphs).',
      },
    },
  },
  render: (args) => {
    const { iconScale, iconAspect, ...iconArgs } = args as ActionIconStoryArgs;
    return (
      <div style={cmfIconCascadeStyle({ scale: iconScale, aspect: iconAspect })}>
        <ActionIcon {...iconArgs}>
          <DemoCmfIcon alt={String(iconArgs['aria-label'] ?? 'action')} />
        </ActionIcon>
      </div>
    );
  },
};

export const IconCascade: Story = {
  parameters: {
    ...elementDocsPreviewParameters,
    docs: {
      description: {
        story: 'Control tokens `--cmf-action-icon-icon-{scale|aspect|width|height}`.',
      },
    },
  },
  render: () => (
    <Stack gap="lg" align="flex-start">
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          scale 0.5 / 0.7 / 1
        </Text>
        <Group gap="md">
          {(['0.5', '0.7', '1'] as const).map((scale) => (
            <div
              key={scale}
              style={cmfControlIconCascadeStyle('action-icon', { scale, aspect: 1 })}
            >
              <ActionIcon variant="default" aria-label={`scale ${scale}`}>
                <DemoCmfIcon alt={`scale ${scale}`} />
              </ActionIcon>
            </div>
          ))}
        </Group>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          aspect 1 / 1.5 / 2 · scale 0.7
        </Text>
        <Group gap="md">
          {(['1', '1.5', '2'] as const).map((aspect) => (
            <div
              key={aspect}
              style={cmfControlIconCascadeStyle('action-icon', { scale: 0.7, aspect })}
            >
              <ActionIcon variant="outline" aria-label={`aspect ${aspect}`}>
                <DemoCmfIcon alt={`aspect ${aspect}`} />
              </ActionIcon>
            </div>
          ))}
        </Group>
      </Stack>
    </Stack>
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
      items={ACTION_ICON_STORY_VARIANTS}
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
    const [args, updateArgs] = useArgs<ActionIconStoryArgs>();
    const { iconScale, iconAspect, ...iconArgs } = args;

    return (
      <MantineDocsPlayground
        args={args}
        fields={ACTION_ICON_DOCS_PLAYGROUND_FIELDS}
        onChange={updateArgs}
      >
        <div style={cmfIconCascadeStyle({ scale: iconScale, aspect: iconAspect })}>
          <ActionIcon {...iconArgs}>
            <DemoCmfIcon alt={String(iconArgs['aria-label'] ?? 'action')} />
          </ActionIcon>
        </div>
      </MantineDocsPlayground>
    );
  },
};
