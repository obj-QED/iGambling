import type { HeaderMenuItem } from '@/widgets/header/types';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { Group, Stack, Text } from '@mantine/core';

import { ASIDE_TYPE_KEYS } from '@/shared/config/asideSettings';
import {
  getSidebarSpecialBlockFixture,
  SIDEBAR_SPECIAL_BLOCK_FIXTURES,
} from '@/storybook/fixtures/sidebarSpecialBlocks';
import {
  mantineBooleanArgType,
  mantineSelectArgType,
  mantineTextArgType,
  mantineVariantArgType,
  omitStorybookNone,
  STORYBOOK_NONE,
} from '@/storybook/helpers/mantineArgTypes';
import { SidebarBlockShell } from '@/storybook/helpers/sidebarBlockShell';
import { StoryLabFrame } from '@/storybook/helpers/StoryLabFrame';
import { Logo } from '@/widgets/sidebar/ui/blocks/Logo/Logo';
import { Search } from '@/widgets/sidebar/ui/blocks/Search/Search';
import { TimerBlock } from '@/widgets/sidebar/ui/blocks/TimerBlock/TimerBlock';
import { WheelMdlBlock } from '@/widgets/sidebar/ui/blocks/WheelMdlBlock/WheelMdlBlock';

const STORYBOOK_ICON = '/uploads/jlogo.webp';
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

type BlockStoryArgs = {
  asideType?: string;
  name?: string;
  label?: string;
  url?: string;
  img?: string;
  type?: string;
  variant?: string;
  menuIcon?: boolean;
  showImg?: boolean;
};

function mergeItem(base: HeaderMenuItem, args: BlockStoryArgs): HeaderMenuItem {
  const cleaned = omitStorybookNone(args as Record<string, unknown>);
  const img =
    args.showImg === false
      ? ''
      : typeof cleaned.img === 'string'
        ? cleaned.img
        : (base.img ?? STORYBOOK_ICON);

  return {
    ...base,
    name: typeof cleaned.name === 'string' ? cleaned.name : (base.name ?? ''),
    label: typeof cleaned.label === 'string' ? cleaned.label : base.label,
    url: typeof cleaned.url === 'string' ? cleaned.url : (base.url ?? '/'),
    img,
    type: typeof cleaned.type === 'string' ? cleaned.type : base.type,
    variant: typeof cleaned.variant === 'string' ? cleaned.variant : base.variant,
    menuIcon: args.menuIcon === true,
  };
}

function shellForArgs(args: BlockStoryArgs, children: ReactNode) {
  const cleaned = omitStorybookNone(args as Record<string, unknown>);
  const configPatch =
    typeof cleaned.asideType === 'string' ? { type: cleaned.asideType } : undefined;

  return <SidebarBlockShell configPatch={configPatch}>{children}</SidebarBlockShell>;
}

const sharedItemArgTypes = {
  asideType: mantineSelectArgType(ASIDE_TYPE_KEYS, { category: 'Config', allowNone: true }),
  name: mantineTextArgType('name'),
  label: mantineTextArgType('label'),
  url: mantineTextArgType('url'),
  img: mantineTextArgType('img'),
  type: mantineSelectArgType(MENU_ITEM_TYPES, { category: 'Item', allowNone: true }),
  variant: mantineVariantArgType(MENU_VARIANTS, 'Item'),
  showImg: mantineBooleanArgType('Item'),
};

const meta = {
  title: 'Widgets/Sidebar/Special Blocks',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Sidebar special blocks — one story tab per key. Controls = aside type + item fields (select / text / boolean).',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta & BlockStoryArgs>;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryLabFrame
      title="Sidebar special blocks"
      summary="Open sibling stories for Logo / Search / Timer / Wheel with dropdown Controls."
      capabilities={[
        'aside_header_logo — mark + optional menuIcon trigger',
        'search_leftmenu — left-menu search',
        'timer / wheel_mdl — promo-style blocks',
        'Toolbar: Aside width / type / layout / mock menu',
      ]}
    >
      <SidebarBlockShell>
        <Group gap="xl" align="flex-start">
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Logo
            </Text>
            <Logo item={SIDEBAR_SPECIAL_BLOCK_FIXTURES.aside_header_logo} />
          </Stack>
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Search
            </Text>
            <Search item={getSidebarSpecialBlockFixture('search_leftmenu')} />
          </Stack>
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Timer
            </Text>
            <TimerBlock item={getSidebarSpecialBlockFixture('timer')} />
          </Stack>
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Wheel
            </Text>
            <WheelMdlBlock item={getSidebarSpecialBlockFixture('wheel_mdl')} />
          </Stack>
        </Group>
      </SidebarBlockShell>
    </StoryLabFrame>
  ),
};

export const LogoStory: Story = {
  name: 'Logo',
  argTypes: {
    ...sharedItemArgTypes,
    menuIcon: mantineBooleanArgType('Logo'),
  },
  args: {
    asideType: 'default',
    name: 'Casino',
    label: 'Home',
    url: '/',
    img: STORYBOOK_ICON,
    type: 'link',
    variant: STORYBOOK_NONE,
    menuIcon: true,
    showImg: true,
  },
  render: (args) => {
    const item = mergeItem(SIDEBAR_SPECIAL_BLOCK_FIXTURES.aside_header_logo, args);

    return (
      <StoryLabFrame
        title="Aside logo"
        summary="`menuIcon` shows the burger/trigger. Empty img + empty name hides the mark."
        capabilities={[
          'menuIcon: true → logo-trigger control',
          'img and/or name → logo mark',
          'asideType compact → ActionIcon presentation',
        ]}
      >
        {shellForArgs(args, <Logo item={item} />)}
      </StoryLabFrame>
    );
  },
};

export const SearchStory: Story = {
  name: 'Search',
  argTypes: sharedItemArgTypes,
  args: {
    asideType: 'default',
    name: 'Search',
    label: 'Search',
    url: '?search=ice',
    img: '',
    type: 'link',
    variant: STORYBOOK_NONE,
    showImg: false,
  },
  render: (args) => {
    const item = mergeItem(getSidebarSpecialBlockFixture('search_leftmenu'), args);

    return (
      <StoryLabFrame
        title="Search (left menu)"
        summary="Registry key `search_leftmenu`."
        capabilities={['Dedicated Search block', 'asideType compact → type-pack Item']}
      >
        {shellForArgs(args, <Search item={item} />)}
      </StoryLabFrame>
    );
  },
};

export const Timer: Story = {
  argTypes: sharedItemArgTypes,
  args: {
    asideType: 'default',
    name: 'Get free money',
    label: 'Timer promo',
    url: '/timer',
    img: '/images/menu/left/999/fire_icon.svg',
    type: 'link',
    variant: STORYBOOK_NONE,
    showImg: true,
  },
  render: (args) => {
    const item = mergeItem(getSidebarSpecialBlockFixture('timer'), args);

    return (
      <StoryLabFrame
        title="Timer"
        summary="Promo / timer special block."
        capabilities={['key: timer', 'img + name from menu DTO']}
      >
        {shellForArgs(args, <TimerBlock item={item} />)}
      </StoryLabFrame>
    );
  },
};

export const Wheel: Story = {
  argTypes: sharedItemArgTypes,
  args: {
    asideType: 'default',
    name: 'Wheel of Fortune Bonus',
    label: 'Wheel',
    url: '/wheel',
    img: '/images/menu/left/999/wheel_md_mini.png',
    type: 'link',
    variant: STORYBOOK_NONE,
    showImg: true,
  },
  render: (args) => {
    const item = mergeItem(getSidebarSpecialBlockFixture('wheel_mdl'), args);

    return (
      <StoryLabFrame
        title="Wheel"
        summary="Registry key `wheel_mdl`."
        capabilities={['key: wheel_mdl', 'img + name from menu DTO']}
      >
        {shellForArgs(args, <WheelMdlBlock item={item} />)}
      </StoryLabFrame>
    );
  },
};
