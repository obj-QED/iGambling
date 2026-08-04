import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Group, Stack, Text } from '@mantine/core';
import { useArgs } from 'storybook/preview-api';

import { CMF_BUTTON_SIZES, CMF_BUTTON_VARIANTS, MANTINE_BUTTON_VARIANTS } from '@/assets/theme';
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
  BUTTON_DOCS_PLAYGROUND_FIELDS,
  MantineDocsPlayground,
  mantineDocsPlaygroundParameters,
} from '@/storybook/helpers/MantineDocsPlayground';
import { VariantMatrix } from '@/storybook/helpers/VariantMatrix';

const BUTTON_STORY_VARIANTS = [
  ...MANTINE_BUTTON_VARIANTS,
  ...CMF_BUTTON_VARIANTS.filter((variant) => variant !== 'exception'),
] as const;

const STORYBOOK_ICON = '/uploads/jlogo.webp';

type ButtonStoryArgs = {
  children?: string;
  variant?: (typeof BUTTON_STORY_VARIANTS)[number];
  color?: string;
  size?: (typeof CMF_BUTTON_SIZES)[number];
  radius?: string;
  disabled?: boolean;
  loading?: boolean;
  /** Project alias — maps to Mantine `fullWidth`. */
  fullscreen?: boolean;
  iconScale?: string;
  iconAspect?: string;
};

function DemoButtonIcon({ alt = 'demo' }: { alt?: string }) {
  return <CmfIcon src={STORYBOOK_ICON} alt={alt} shape="rect" radius="sm" />;
}

const meta = {
  title: 'Elements/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Mantine Button + CMF cascade. Icon media size: `--cmf-button[-{scope}]-icon-{scale|aspect|width|height}` → `--cmf-icon-*` → box × scale × aspect.',
      },
    },
  },
  argTypes: {
    variant: mantineVariantArgType(BUTTON_STORY_VARIANTS),
    color: mantineColorArgType(),
    size: mantineSizeArgType(CMF_BUTTON_SIZES),
    radius: mantineRadiusArgType(),
    disabled: mantineBooleanArgType(),
    loading: mantineBooleanArgType(),
    fullscreen: mantineBooleanArgType('Layout'),
    children: mantineTextArgType('children'),
    iconScale: mantineVariantArgType(['0.5', '0.7', '1'] as const, 'Icon'),
    iconAspect: mantineVariantArgType(['1', '1.5', '2'] as const, 'Icon'),
  },
  args: {
    children: 'Button',
    variant: 'filled',
    color: 'brand',
    size: 'md',
    radius: 'md',
    disabled: false,
    loading: false,
    fullscreen: false,
    iconScale: '0.7',
    iconAspect: '1',
  },
} satisfies Meta<typeof Button & ButtonStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: elementDocsPreviewParameters,
  render: (args) => {
    const cleaned = omitStorybookNone(args as Record<string, unknown>);
    const { iconScale, iconAspect, children, fullscreen, ...buttonArgs } =
      cleaned as ButtonStoryArgs;
    void iconScale;
    void iconAspect;
    return (
      <Button {...buttonArgs} fullWidth={fullscreen}>
        {children}
      </Button>
    );
  },
};

export const WithIcon: Story = {
  parameters: {
    ...elementDocsPreviewParameters,
    docs: {
      description: {
        story: 'CmfIcon in `leftSection` — size from `--button-height` × scale × aspect.',
      },
    },
  },
  render: (args) => {
    const cleaned = omitStorybookNone(args as Record<string, unknown>);
    const { iconScale, iconAspect, children, fullscreen, ...buttonArgs } =
      cleaned as ButtonStoryArgs;
    return (
      <div style={cmfIconCascadeStyle({ scale: iconScale, aspect: iconAspect })}>
        <Button
          {...buttonArgs}
          fullWidth={fullscreen}
          leftSection={<DemoButtonIcon alt={String(children ?? 'Button')} />}
        >
          {children}
        </Button>
      </div>
    );
  },
};

export const IconCascade: Story = {
  parameters: {
    ...elementDocsPreviewParameters,
    docs: {
      description: {
        story:
          'Token ladder demos. Prefer `--cmf-button-icon-*` / widget scope over bare `%` of row width.',
      },
    },
  },
  render: () => (
    <Stack gap="lg" align="flex-start">
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          scale 0.5 / 0.7 / 1 · aspect 1
        </Text>
        <Group gap="md">
          {(['0.5', '0.7', '1'] as const).map((scale) => (
            <div key={scale} style={cmfControlIconCascadeStyle('button', { scale, aspect: 1 })}>
              <Button variant="default" leftSection={<DemoButtonIcon alt={`scale ${scale}`} />}>
                {scale}
              </Button>
            </div>
          ))}
        </Group>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          aspect 1 / 1.5 / 2 · scale 0.7 (sidebar-like)
        </Text>
        <Group gap="md">
          {(['1', '1.5', '2'] as const).map((aspect) => (
            <div key={aspect} style={cmfControlIconCascadeStyle('button', { scale: 0.7, aspect })}>
              <Button variant="outline" leftSection={<DemoButtonIcon alt={`aspect ${aspect}`} />}>
                {aspect}
              </Button>
            </div>
          ))}
        </Group>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          explicit `--cmf-button-icon-height: 1.25rem`
        </Text>
        <div style={cmfControlIconCascadeStyle('button', { height: '1.25rem', width: '1.875rem' })}>
          <Button variant="light" leftSection={<DemoButtonIcon alt="explicit size" />}>
            fixed
          </Button>
        </div>
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
      items={BUTTON_STORY_VARIANTS}
      columns={4}
      renderItem={(variant) => <Button variant={variant}>{variant}</Button>}
    />
  ),
};

export const Playground: Story = {
  parameters: {
    ...elementPlaygroundParameters,
    controls: mantineDocsPlaygroundParameters.controls,
  },
  render: function ButtonPlayground() {
    const [args, updateArgs] = useArgs<ButtonStoryArgs>();
    const cleaned = omitStorybookNone(args as Record<string, unknown>);
    const { iconScale, iconAspect, children, fullscreen, ...buttonArgs } =
      cleaned as ButtonStoryArgs;

    return (
      <MantineDocsPlayground
        args={args}
        fields={BUTTON_DOCS_PLAYGROUND_FIELDS}
        onChange={updateArgs}
      >
        <div style={cmfIconCascadeStyle({ scale: iconScale, aspect: iconAspect })}>
          <Button
            {...buttonArgs}
            fullWidth={fullscreen}
            leftSection={<DemoButtonIcon alt={String(children ?? 'Button')} />}
          >
            {children}
          </Button>
        </div>
      </MantineDocsPlayground>
    );
  },
};
