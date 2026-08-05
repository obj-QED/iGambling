import type { HeaderMenuItem } from '@/widgets/header/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group, Stack, Text } from '@mantine/core';

import { getHeaderMenuControlItems } from '@/storybook/helpers/getHeaderMenuControlItems';
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
import {
  STORYBOOK_DEMO_LOGO,
  STORYBOOK_TABLER_BELL,
  STORYBOOK_TABLER_GIFT,
  STORYBOOK_TABLER_SEARCH,
  STORYBOOK_TABLER_WALLET,
} from '@/storybook/lib';
import { BonusBoxBlock } from '@/widgets/header/ui/blocks/BonusBoxBlock/BonusBoxBlock';
import { ColorSchemeBlock } from '@/widgets/header/ui/blocks/ColorSchemeBlock/ColorSchemeBlock';
import { LogoBlock } from '@/widgets/header/ui/blocks/LogoBlock/LogoBlock';
import { NotificationBlock } from '@/widgets/header/ui/blocks/NotificationBlock/NotificationBlock';
import { SEARCH_VARIANT_REGISTRY } from '@/widgets/header/ui/blocks/SearchBlock/registry';
import { SearchBlock } from '@/widgets/header/ui/blocks/SearchBlock/SearchBlock';
import { WALLET_VARIANT_REGISTRY } from '@/widgets/header/ui/blocks/WalletBlock/registry';
import { WalletBlock } from '@/widgets/header/ui/blocks/WalletBlock/WalletBlock';

const SEARCH_VARIANTS = Object.keys(SEARCH_VARIANT_REGISTRY);
const WALLET_VARIANTS = Object.keys(WALLET_VARIANT_REGISTRY);

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
  blockVariant?: string;
  name?: string;
  label?: string;
  url?: string;
  img?: string;
  type?: string;
  variant?: string;
  menuIcon?: boolean;
  showImg?: boolean;
};

function mergeItem(base: HeaderMenuItem | undefined, args: BlockStoryArgs): HeaderMenuItem {
  const cleaned = omitStorybookNone(args as Record<string, unknown>);
  const img =
    args.showImg === false
      ? ''
      : typeof cleaned.img === 'string'
        ? cleaned.img
        : (base?.img ?? STORYBOOK_ICON);

  return {
    ...(base ?? { key: 'demo', url: '/', name: 'Demo' }),
    name: typeof cleaned.name === 'string' ? cleaned.name : (base?.name ?? ''),
    label: typeof cleaned.label === 'string' ? cleaned.label : base?.label,
    url: typeof cleaned.url === 'string' ? cleaned.url : (base?.url ?? '/'),
    img,
    type: typeof cleaned.type === 'string' ? cleaned.type : base?.type,
    variant: typeof cleaned.variant === 'string' ? cleaned.variant : base?.variant,
    menuIcon: args.menuIcon === true,
  };
}

const sharedItemArgTypes = {
  name: mantineTextArgType('name'),
  label: mantineTextArgType('label'),
  url: mantineTextArgType('url'),
  img: mantineTextArgType('img'),
  type: mantineSelectArgType(MENU_ITEM_TYPES, { category: 'Item', allowNone: true }),
  variant: mantineVariantArgType(MENU_VARIANTS, 'Item'),
  showImg: mantineBooleanArgType('Item'),
};

const meta = {
  title: 'Widgets/Header/Special Blocks',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Header special blocks — one story tab per block. Controls = dropdowns for adapter (`blockVariants`) and menu item fields.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta & BlockStoryArgs>;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const { searchItem, walletItem, notificationItem } = getHeaderMenuControlItems();

    return (
      <StoryLabFrame
        title="Header special blocks"
        summary="Open the sibling stories (Search, Wallet, …) for per-block dropdowns. Overview shows default adapters side by side."
        capabilities={[
          'search → blockVariants.search: compact | input | modal',
          'wallet → blockVariants.wallet: compact | full | drawer',
          'logo / notification / bonus_box / color_scheme — dedicated UI (no menu type rules)',
          'Toolbar: Color scheme, Primary color, Header session / layout / type',
        ]}
      >
        <HeaderMenuControlsShell>
          <Group gap="xl" align="flex-start">
            <Stack gap="xs">
              <Text size="sm" fw={600}>
                Search
              </Text>
              {searchItem ? <SearchBlock item={searchItem} /> : null}
            </Stack>
            <Stack gap="xs">
              <Text size="sm" fw={600}>
                Wallet
              </Text>
              {walletItem ? <WalletBlock item={walletItem} /> : null}
            </Stack>
            <Stack gap="xs">
              <Text size="sm" fw={600}>
                Notification
              </Text>
              {notificationItem ? <NotificationBlock item={notificationItem} /> : null}
            </Stack>
            <Stack gap="xs">
              <Text size="sm" fw={600}>
                Color scheme
              </Text>
              <ColorSchemeBlock item={{ key: 'color_scheme', url: '', name: '' }} />
            </Stack>
          </Group>
        </HeaderMenuControlsShell>
      </StoryLabFrame>
    );
  },
};

export const Search: Story = {
  argTypes: {
    blockVariant: mantineSelectArgType(SEARCH_VARIANTS, { category: 'Adapter' }),
    ...sharedItemArgTypes,
  },
  args: {
    blockVariant: 'compact',
    name: '',
    label: 'Search',
    url: '/search',
    img: STORYBOOK_TABLER_SEARCH,
    type: STORYBOOK_NONE,
    variant: STORYBOOK_NONE,
    showImg: true,
  },
  render: (args) => {
    const { searchItem } = getHeaderMenuControlItems();
    const item = mergeItem(searchItem ?? { key: 'search', url: '/search', name: '' }, args);

    return (
      <StoryLabFrame
        title="Search"
        summary="Adapter from `header.blockVariants.search`. Item fields map to the menu DTO."
        capabilities={SEARCH_VARIANTS.map((v) => `variant: ${v}`)}
      >
        <HeaderMenuControlsShell configPatch={{ blockVariants: { search: args.blockVariant } }}>
          <SearchBlock item={item} />
        </HeaderMenuControlsShell>
      </StoryLabFrame>
    );
  },
};

export const Wallet: Story = {
  argTypes: {
    blockVariant: mantineSelectArgType(WALLET_VARIANTS, { category: 'Adapter' }),
    ...sharedItemArgTypes,
  },
  args: {
    blockVariant: 'compact',
    name: 'Wallet',
    label: 'Wallet',
    url: '/wallet',
    img: STORYBOOK_TABLER_WALLET,
    type: STORYBOOK_NONE,
    variant: STORYBOOK_NONE,
    showImg: true,
  },
  render: (args) => {
    const { walletItem } = getHeaderMenuControlItems();
    const item = mergeItem(walletItem ?? { key: 'wallet', url: '/wallet', name: 'Wallet' }, args);

    return (
      <StoryLabFrame
        title="Wallet"
        summary="Adapter from `header.blockVariants.wallet`."
        capabilities={WALLET_VARIANTS.map((v) => `variant: ${v}`)}
      >
        <HeaderMenuControlsShell configPatch={{ blockVariants: { wallet: args.blockVariant } }}>
          <WalletBlock item={item} />
        </HeaderMenuControlsShell>
      </StoryLabFrame>
    );
  },
};

export const Logo: Story = {
  argTypes: {
    ...sharedItemArgTypes,
    variant: mantineVariantArgType(MENU_VARIANTS, 'Appearance'),
  },
  args: {
    name: 'Casino',
    label: 'Home',
    url: '/',
    img: STORYBOOK_DEMO_LOGO,
    type: 'link',
    variant: 'transparent',
    showImg: true,
  },
  render: (args) => {
    const item = mergeItem(
      { key: 'logo', url: '/', name: 'Casino', img: STORYBOOK_DEMO_LOGO },
      args,
    );

    return (
      <StoryLabFrame
        title="Logo"
        summary="Header logo block (`AppLogo`). Toggle showImg / name to preview empty and text fallbacks."
        capabilities={[
          'img + name → mark',
          'name only → text mark',
          'broken / empty img + name → text fallback inside AppLogo',
        ]}
      >
        <HeaderMenuControlsShell>
          <LogoBlock item={item} />
        </HeaderMenuControlsShell>
      </StoryLabFrame>
    );
  },
};

export const Notification: Story = {
  argTypes: sharedItemArgTypes,
  args: {
    name: '',
    label: 'Notifications',
    url: '/notifications',
    img: STORYBOOK_TABLER_BELL,
    type: STORYBOOK_NONE,
    variant: STORYBOOK_NONE,
    showImg: true,
  },
  render: (args) => {
    const { notificationItem } = getHeaderMenuControlItems();
    const item = mergeItem(
      notificationItem ?? { key: 'notification', url: '/notifications', name: '' },
      args,
    );

    return (
      <StoryLabFrame
        title="Notification"
        summary="Special icon block with Tabler fallback when media fails / empty."
        capabilities={[
          'img optional',
          'fallback IconBellRinging',
          'badge via item.badge (menu DTO)',
        ]}
      >
        <HeaderMenuControlsShell>
          <NotificationBlock item={item} />
        </HeaderMenuControlsShell>
      </StoryLabFrame>
    );
  },
};

export const ColorScheme: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryLabFrame
      title="Color scheme"
      summary="Config-only block (`customBlocks`). Toggles Mantine color scheme in the app; in Storybook also use the toolbar Color scheme control."
      capabilities={[
        'Injected via header.customBlocks / toolbar Color scheme slot',
        'No menu type / name+img rules',
      ]}
    >
      <HeaderMenuControlsShell>
        <ColorSchemeBlock item={{ key: 'color_scheme', url: '', name: '' }} />
      </HeaderMenuControlsShell>
    </StoryLabFrame>
  ),
};

export const BonusBox: Story = {
  argTypes: sharedItemArgTypes,
  args: {
    name: 'Bonus',
    label: 'Bonus box',
    url: '/bonus',
    img: STORYBOOK_TABLER_GIFT,
    type: 'link',
    variant: STORYBOOK_NONE,
    showImg: true,
  },
  render: (args) => {
    const item = mergeItem(
      { key: 'bonus_box', url: '/bonus', name: 'Bonus', img: STORYBOOK_TABLER_GIFT },
      args,
    );

    return (
      <StoryLabFrame
        title="Bonus box"
        summary="Requires an image (Tabler `gift` in Storybook). Hide img (showImg off) → block returns null."
        capabilities={[
          'requires img',
          'transparent AppButton + CmfIcon',
          'onError → photo fallback',
        ]}
      >
        <HeaderMenuControlsShell>
          <BonusBoxBlock item={item} />
        </HeaderMenuControlsShell>
      </StoryLabFrame>
    );
  },
};
