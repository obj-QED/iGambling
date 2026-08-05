import type { HeaderMenuItem } from '@/widgets/header/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group, Stack, Text } from '@mantine/core';

import { getHeaderMenuItemFixture } from '@/storybook/fixtures/headerMenuItems';
import { cmfComponentIconCascadeStyle } from '@/storybook/helpers/cmfScopeOverrides';
import { elementDocsPreviewParameters } from '@/storybook/helpers/elementStoryParameters';
import { HeaderMenuControlsShell } from '@/storybook/helpers/headerMenuControls';
import {
  mantineBooleanArgType,
  mantineSelectArgType,
  mantineTextArgType,
  mantineVariantArgType,
  omitStorybookNone,
  STORYBOOK_NONE,
} from '@/storybook/helpers/mantineArgTypes';
import { StoryLabFrame } from '@/storybook/helpers/StoryLabFrame';
import { STORYBOOK_TABLER, STORYBOOK_TABLER_GIFT } from '@/storybook/lib';
import { Dropdown } from '@/widgets/header/ui/items/Dropdown/Dropdown';
import { ItemActionIcon } from '@/widgets/header/ui/items/ItemActionIcon/ItemActionIcon';
import { ItemButton } from '@/widgets/header/ui/items/ItemButton/ItemButton';

const STORYBOOK_ICON = STORYBOOK_TABLER.spade;
const MENU_ITEM_TYPES = ['link', 'button'] as const;
const MENU_VARIANTS = [
  'default',
  'filled',
  'light',
  'outline',
  'subtle',
  'transparent',
  'white',
] as const;
const RENDER_AS = ['button', 'actionIcon', 'dropdown'] as const;

type MenuItemPlaygroundArgs = {
  renderAs?: (typeof RENDER_AS)[number];
  name?: string;
  label?: string;
  url?: string;
  img?: string;
  type?: string;
  variant?: string;
  showImg?: boolean;
  withChildren?: boolean;
};

const meta = {
  title: 'Widgets/Header/Menu Items',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    ...elementDocsPreviewParameters,
    docs: {
      ...elementDocsPreviewParameters.docs,
      description: {
        component: [
          '**What:** leaf renderers for header menu rows — `ItemButton`, `ItemActionIcon`, `Dropdown`.',
          '',
          '**Why:** these are what `DefaultItemBlock` / block registry mount for normal API items (not wallet/search adapters).',
          '',
          '**How:** open **Playground** → Controls (`renderAs`, `name`, `img`, `variant`). Icon-only rows use ActionIcon; labeled rows use Button; `items[]` → Dropdown.',
          '',
          'Scoped under `[data-widget=header]` so CMF icon/control tokens apply.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta & MenuItemPlaygroundArgs>;

export const Overview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Catalog of common menu-item shapes. Use Playground to mutate DTO fields; Lab/App Settings → Header for the full shell.',
      },
    },
  },
  render: () => (
    <StoryLabFrame
      title="Header menu items"
      summary="Building blocks for default menu rows (not special adapters like wallet/search). Each sample is a real ItemButton / ItemActionIcon / Dropdown."
      howTo="Open Playground for Controls. For full header chrome use Lab → App Settings → Header."
      capabilities={[
        'Icon-only → ItemActionIcon',
        'Labeled → ItemButton',
        'With children → Dropdown',
      ]}
    >
      <HeaderMenuControlsShell>
        <Stack gap="xl" align="flex-start">
          <Stack gap="xs" align="flex-start">
            <Text size="sm" fw={600} c="var(--color-text)">
              Icon only · type link · transparent
            </Text>
            <Group gap="sm">
              <ItemActionIcon item={getHeaderMenuItemFixture('iconOnlyLink')} />
            </Group>
          </Stack>

          <Stack gap="xs" align="flex-start">
            <Text size="sm" fw={600} c="var(--color-text)">
              Text only · type button · default
            </Text>
            <ItemButton item={getHeaderMenuItemFixture('textButton')} />
          </Stack>

          <Stack gap="xs" align="flex-start">
            <Text size="sm" fw={600} c="var(--color-text)">
              Icon + name · type link
            </Text>
            <ItemButton item={getHeaderMenuItemFixture('iconAndText')} />
          </Stack>

          <Stack gap="xs" align="flex-start">
            <Text size="sm" fw={600} c="var(--color-text)">
              Dropdown · icon trigger + menu
            </Text>
            <Dropdown item={getHeaderMenuItemFixture('dropdownProfile')} />
          </Stack>

          <Stack gap="xs" align="flex-start">
            <Text size="sm" fw={600} c="var(--color-text)">
              Broken image · fallback glyph when name is set
            </Text>
            <ItemButton item={getHeaderMenuItemFixture('brokenImgWithName')} />
          </Stack>
        </Stack>
      </HeaderMenuControlsShell>
    </StoryLabFrame>
  ),
};

export const Behaviors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Menu DTO behaviors: `type` (link→transparent / button→default), explicit `variant`, icon-only vs labeled, dropdown with children.',
      },
    },
  },
  render: () => (
    <StoryLabFrame
      title="Item behaviors"
      summary="How DefaultItemBlock chooses ActionIcon vs Button vs Dropdown, and how type/variant paint the control."
      howTo="Compare rows: empty name → ActionIcon; name set → Button; items[] → Dropdown. type=link defaults transparent; type=button defaults default; variant overrides."
      capabilities={[
        'type: link → transparent (unless variant set)',
        'type: button → default (unless variant set)',
        'variant: filled | outline | light | …',
        'icon-only | text-only | icon+text | dropdown',
      ]}
    >
      <HeaderMenuControlsShell>
        <Stack gap="lg" align="flex-start">
          <Stack gap={6}>
            <Text size="sm" fw={600} c="var(--color-text)">
              Presentation
            </Text>
            <Group gap="md" align="center">
              <Stack gap={4} align="center">
                <ItemActionIcon item={getHeaderMenuItemFixture('iconOnlyLink')} />
                <Text size="xs" c="var(--color-text-muted)">
                  icon-only · link
                </Text>
              </Stack>
              <Stack gap={4} align="center">
                <ItemButton item={getHeaderMenuItemFixture('textButton')} />
                <Text size="xs" c="var(--color-text-muted)">
                  text · button
                </Text>
              </Stack>
              <Stack gap={4} align="center">
                <ItemButton item={getHeaderMenuItemFixture('iconAndText')} />
                <Text size="xs" c="var(--color-text-muted)">
                  icon+text · link
                </Text>
              </Stack>
              <Stack gap={4} align="center">
                <Dropdown item={getHeaderMenuItemFixture('dropdownProfile')} />
                <Text size="xs" c="var(--color-text-muted)">
                  dropdown
                </Text>
              </Stack>
            </Group>
          </Stack>

          <Stack gap={6}>
            <Text size="sm" fw={600} c="var(--color-text)">
              type / variant paint
            </Text>
            <Group gap="md" wrap="wrap">
              <ItemButton item={getHeaderMenuItemFixture('iconAndText')} />
              <ItemButton item={getHeaderMenuItemFixture('iconAndTextFilled')} />
              <ItemButton item={getHeaderMenuItemFixture('outlineLink')} />
              <ItemButton
                item={{
                  key: 'subtle',
                  name: 'Subtle',
                  url: '/subtle',
                  img: STORYBOOK_TABLER_GIFT,
                  type: 'button',
                  variant: 'subtle',
                }}
              />
              <ItemButton
                item={{
                  key: 'light',
                  name: 'Light',
                  url: '/light',
                  img: STORYBOOK_TABLER.star,
                  type: 'button',
                  variant: 'light',
                }}
              />
            </Group>
          </Stack>
        </Stack>
      </HeaderMenuControlsShell>
    </StoryLabFrame>
  ),
};

export const IconCascade: Story = {
  parameters: {
    ...elementDocsPreviewParameters,
    docs: {
      description: {
        story:
          'Override `--cmf-button-icon-*` / `--cmf-action-icon-icon-*` around menu items (same cascade as widget tokens).',
      },
    },
  },
  render: () => (
    <HeaderMenuControlsShell>
      <Stack gap="xl" align="flex-start">
        <Stack gap="xs" align="flex-start">
          <Text size="sm" fw={600}>
            ActionIcon · scale 0.5 / 0.7 / 1
          </Text>
          <Group gap="md">
            {(['0.5', '0.7', '1'] as const).map((scale) => (
              <div
                key={scale}
                style={cmfComponentIconCascadeStyle('action-icon', 'header', {
                  scale,
                  aspect: 1,
                })}
              >
                <ItemActionIcon item={getHeaderMenuItemFixture('iconOnlyLink')} />
              </div>
            ))}
          </Group>
        </Stack>

        <Stack gap="xs" align="flex-start">
          <Text size="sm" fw={600}>
            Button · aspect 1 / 1.5 / 2 (sidebar-like)
          </Text>
          <Group gap="md">
            {(['1', '1.5', '2'] as const).map((aspect) => (
              <div
                key={aspect}
                style={cmfComponentIconCascadeStyle('button', 'header', { scale: 0.7, aspect })}
              >
                <ItemButton item={getHeaderMenuItemFixture('iconAndText')} />
              </div>
            ))}
          </Group>
        </Stack>
      </Stack>
    </HeaderMenuControlsShell>
  ),
};

export const Playground: Story = {
  argTypes: {
    renderAs: mantineSelectArgType(RENDER_AS, { category: 'Renderer' }),
    name: mantineTextArgType('name'),
    label: mantineTextArgType('label'),
    url: mantineTextArgType('url'),
    img: mantineTextArgType('img'),
    type: mantineSelectArgType(MENU_ITEM_TYPES, { category: 'Item', allowNone: true }),
    variant: mantineVariantArgType(MENU_VARIANTS, 'Item'),
    showImg: mantineBooleanArgType('Item'),
    withChildren: mantineBooleanArgType('Dropdown'),
  },
  args: {
    renderAs: 'button',
    name: 'Casino',
    label: 'Casino',
    url: '/',
    img: STORYBOOK_ICON,
    type: 'link',
    variant: STORYBOOK_NONE,
    showImg: true,
    withChildren: true,
  },
  render: (args) => {
    const cleaned = omitStorybookNone(args as Record<string, unknown>);
    const item: HeaderMenuItem = {
      key: 'playground',
      name: typeof cleaned.name === 'string' ? cleaned.name : 'Casino',
      label: typeof cleaned.label === 'string' ? cleaned.label : undefined,
      url: typeof cleaned.url === 'string' ? cleaned.url : '/',
      img:
        args.showImg === false
          ? ''
          : typeof cleaned.img === 'string'
            ? cleaned.img
            : STORYBOOK_ICON,
      type: typeof cleaned.type === 'string' ? cleaned.type : 'link',
      variant: typeof cleaned.variant === 'string' ? cleaned.variant : undefined,
      items:
        args.withChildren === true
          ? [
              { key: 'a', name: 'Deposit', url: '/deposit' },
              { key: 'b', name: 'Profile', url: '/profile' },
            ]
          : undefined,
    };

    const renderAs = args.renderAs ?? 'button';

    return (
      <StoryLabFrame
        title="Menu item playground"
        summary="Pick renderer + item fields in Controls. Empty name + img → ActionIcon path; name → Button; items → Dropdown."
        capabilities={[
          'renderAs: button | actionIcon | dropdown',
          'type / variant / img / name — menu DTO knobs',
          'withChildren — dropdown submenu rows',
        ]}
      >
        <HeaderMenuControlsShell>
          {renderAs === 'actionIcon' ? <ItemActionIcon item={item} /> : null}
          {renderAs === 'button' ? <ItemButton item={item} /> : null}
          {renderAs === 'dropdown' ? <Dropdown item={item} /> : null}
        </HeaderMenuControlsShell>
      </StoryLabFrame>
    );
  },
};
