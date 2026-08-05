import type { Meta, StoryObj } from '@storybook/react-vite';

import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useArgs } from 'storybook/preview-api';

import { CMF_ACTION_ICON_SIZES, MANTINE_ACTION_ICON_VARIANTS } from '@/assets/theme';
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
  omitStorybookNone,
} from '@/storybook/helpers/mantineArgTypes';
import {
  ACTION_ICON_DOCS_PLAYGROUND_FIELDS,
  MantineDocsPlayground,
  mantineDocsPlaygroundParameters,
} from '@/storybook/helpers/MantineDocsPlayground';
import {
  playgroundGradientFromColor,
  playgroundPaintStyle,
} from '@/storybook/helpers/playgroundGradient';
import { VariantMatrix } from '@/storybook/helpers/VariantMatrix';
import { STORYBOOK_DEMO_ICON } from '@/storybook/lib';

const ACTION_ICON_STORY_VARIANTS = [...MANTINE_ACTION_ICON_VARIANTS] as const;

const STORYBOOK_ICON = STORYBOOK_DEMO_ICON;

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
    variant: 'filled',
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
    const cleaned = omitStorybookNone(args as Record<string, unknown>);
    const { iconScale, iconAspect, ...iconArgs } = cleaned as ActionIconStoryArgs;
    void iconScale;
    void iconAspect;
    return (
      <Stack gap="sm" align="flex-start">
        <Text size="sm" fw={600}>
          ActionIcon — default (Tabler glyph)
        </Text>
        <ActionIcon {...iconArgs}>
          <DemoGlyph />
        </ActionIcon>
      </Stack>
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
    const cleaned = omitStorybookNone(args as Record<string, unknown>);
    const { iconScale, iconAspect, ...iconArgs } = cleaned as ActionIconStoryArgs;
    return (
      <Stack gap="sm" align="flex-start">
        <Text size="sm" fw={600}>
          ActionIcon — CmfIcon media
        </Text>
        <div style={cmfIconCascadeStyle({ scale: iconScale, aspect: iconAspect })}>
          <ActionIcon {...iconArgs}>
            <DemoCmfIcon alt={String(iconArgs['aria-label'] ?? 'action')} />
          </ActionIcon>
        </div>
      </Stack>
    );
  },
};

export const IconCascade: Story = {
  parameters: {
    ...elementDocsPreviewParameters,
    docs: {
      description: {
        story:
          'Icon box = `--ai-size` × scale × aspect. Toggle **Color scheme** in the toolbar to verify light/dark brand paint. CMF media uses `CmfIcon`, not Tabler strokes.',
      },
    },
  },
  render: () => (
    <Stack gap="xl" align="stretch" maw={520}>
      <Stack gap="sm">
        <Text size="sm" fw={600}>
          Scale — 0.5 / 0.7 / 1 (aspect 1)
        </Text>
        <Group gap="lg" align="flex-end" wrap="wrap">
          {(['0.5', '0.7', '1'] as const).map((scale) => (
            <Stack key={scale} gap={6} align="center">
              <div style={cmfControlIconCascadeStyle('action-icon', { scale, aspect: 1 })}>
                <ActionIcon variant="default" size="lg" aria-label={`scale ${scale}`}>
                  <DemoCmfIcon alt={`scale ${scale}`} />
                </ActionIcon>
              </div>
              <Text size="xs" c="var(--color-text-muted)">
                {scale}
              </Text>
            </Stack>
          ))}
        </Group>
      </Stack>
      <Stack gap="sm">
        <Text size="sm" fw={600}>
          Aspect — 1 / 1.5 / 2 (scale 0.7)
        </Text>
        <Group gap="lg" align="flex-end" wrap="wrap">
          {(['1', '1.5', '2'] as const).map((aspect) => (
            <Stack key={aspect} gap={6} align="center">
              <div style={cmfControlIconCascadeStyle('action-icon', { scale: 0.7, aspect })}>
                <ActionIcon variant="outline" size="lg" aria-label={`aspect ${aspect}`}>
                  <DemoCmfIcon alt={`aspect ${aspect}`} />
                </ActionIcon>
              </div>
              <Text size="xs" c="var(--color-text-muted)">
                {aspect}
              </Text>
            </Stack>
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
      contrastItems={['white']}
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
  /** Use story `args` (incl. URL) for values; `useArgs` only to write updates. */
  render: function ActionIconPlayground(storyArgs) {
    const [, updateArgs] = useArgs<ActionIconStoryArgs>();
    const cleaned = omitStorybookNone(storyArgs as Record<string, unknown>);
    const { iconScale, iconAspect, ...iconArgs } = cleaned as ActionIconStoryArgs;
    const isGradient = iconArgs.variant === 'gradient';
    const paintStyle = playgroundPaintStyle('ai', iconArgs.variant, iconArgs.color);

    return (
      <MantineDocsPlayground
        args={storyArgs as ActionIconStoryArgs & Record<string, unknown>}
        fields={ACTION_ICON_DOCS_PLAYGROUND_FIELDS}
        onChange={updateArgs}
      >
        <div style={cmfIconCascadeStyle({ scale: iconScale, aspect: iconAspect })}>
          <ActionIcon
            {...iconArgs}
            gradient={isGradient ? playgroundGradientFromColor(iconArgs.color) : undefined}
            style={paintStyle}
          >
            <DemoCmfIcon alt={String(iconArgs['aria-label'] ?? 'action')} />
          </ActionIcon>
        </div>
      </MantineDocsPlayground>
    );
  },
};
