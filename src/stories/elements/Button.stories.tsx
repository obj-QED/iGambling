import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Group, Stack, Text } from '@mantine/core';
import { useArgs } from 'storybook/preview-api';

import { CMF_BUTTON_SIZES, MANTINE_BUTTON_VARIANTS } from '@/assets/theme';
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
import {
  playgroundGradientFromColor,
  playgroundPaintStyle,
} from '@/storybook/helpers/playgroundGradient';
import { VariantMatrix } from '@/storybook/helpers/VariantMatrix';
import { STORYBOOK_DEMO_ICON } from '@/storybook/lib';

const BUTTON_STORY_VARIANTS = [...MANTINE_BUTTON_VARIANTS] as const;

const STORYBOOK_ICON = STORYBOOK_DEMO_ICON;

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
        component: [
          'Mantine `Button` with project theme. **Playground** (Canvas): live variant / color swatches / size / radius — like [Mantine Button docs](https://mantine.dev/core/button/), compact.',
          '',
          'Widget menus (`data-cmf-*`) use CMF cascade paints; plain Elements keep Mantine `color` resolution.',
          'Icon size: `--cmf-button[-{scope}]-icon-{scale|aspect|width|height}`.',
        ].join('\n'),
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
      disable: true,
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
      disable: true,
    },
  },
  render: () => (
    <Stack gap="xl" align="stretch" maw={640}>
      <Stack gap="sm">
        <Text size="sm" fw={600}>
          Scale — 0.5 / 0.7 / 1 (aspect 1)
        </Text>
        <Group gap="md" wrap="wrap" align="flex-end">
          {(['0.5', '0.7', '1'] as const).map((scale) => (
            <div key={scale} style={cmfControlIconCascadeStyle('button', { scale, aspect: 1 })}>
              <Button variant="default" leftSection={<DemoButtonIcon alt={`scale ${scale}`} />}>
                {scale}
              </Button>
            </div>
          ))}
        </Group>
      </Stack>
      <Stack gap="sm">
        <Text size="sm" fw={600}>
          Aspect — 1 / 1.5 / 2 (scale 0.7)
        </Text>
        <Group gap="md" wrap="wrap" align="flex-end">
          {(['1', '1.5', '2'] as const).map((aspect) => (
            <div key={aspect} style={cmfControlIconCascadeStyle('button', { scale: 0.7, aspect })}>
              <Button variant="outline" leftSection={<DemoButtonIcon alt={`aspect ${aspect}`} />}>
                {aspect}
              </Button>
            </div>
          ))}
        </Group>
      </Stack>
      <Stack gap="sm">
        <Text size="sm" fw={600}>
          Explicit height / width tokens
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
      contrastItems={['white']}
      renderItem={(variant) => <Button variant={variant}>{variant}</Button>}
    />
  ),
};

export const Playground: Story = {
  parameters: {
    ...elementPlaygroundParameters,
    controls: mantineDocsPlaygroundParameters.controls,
  },
  /** Use story `args` (incl. URL) for values; `useArgs` only to write updates. */
  render: function ButtonPlayground(storyArgs) {
    const [, updateArgs] = useArgs<ButtonStoryArgs>();
    const cleaned = omitStorybookNone(storyArgs as Record<string, unknown>);
    const { iconScale, iconAspect, children, fullscreen, ...buttonArgs } =
      cleaned as ButtonStoryArgs;
    const isGradient = buttonArgs.variant === 'gradient';
    const paintStyle = playgroundPaintStyle('button', buttonArgs.variant, buttonArgs.color);

    return (
      <MantineDocsPlayground
        args={storyArgs as ButtonStoryArgs & Record<string, unknown>}
        fields={BUTTON_DOCS_PLAYGROUND_FIELDS}
        onChange={updateArgs}
      >
        <div
          style={{
            ...cmfIconCascadeStyle({ scale: iconScale, aspect: iconAspect }),
            width: '100%',
          }}
        >
          <Button
            {...buttonArgs}
            fullWidth={Boolean(fullscreen)}
            gradient={isGradient ? playgroundGradientFromColor(buttonArgs.color) : undefined}
            style={paintStyle}
            leftSection={<DemoButtonIcon alt={String(children ?? 'Button')} />}
          >
            {children}
          </Button>
        </div>
      </MantineDocsPlayground>
    );
  },
};
