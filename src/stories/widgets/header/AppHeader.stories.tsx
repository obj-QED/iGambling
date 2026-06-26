import type { HeaderConfig } from '@/widgets/header/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group, Stack, Text, Title } from '@mantine/core';

import {
  getHeaderMenuControlItems,
  HeaderMenuControlsShell,
} from '@/storybook/helpers/headerMenuControls';
import { resolveStorybookHeaderProps } from '@/storybook/helpers/resolveStorybookHeaderProps';
import { AppHeader } from '@/widgets/header';
import { ColorSchemeBlock } from '@/widgets/header/ui/blocks/ColorSchemeBlock/ColorSchemeBlock';
import { SearchBlock } from '@/widgets/header/ui/blocks/SearchBlock/SearchBlock';
import { WalletBlock } from '@/widgets/header/ui/blocks/WalletBlock/WalletBlock';
import { Chevron } from '@/widgets/header/ui/menu/Chevron/Chevron';
import { Dropdown } from '@/widgets/header/ui/menu/Dropdown/Dropdown';
import { ItemActionIcon } from '@/widgets/header/ui/menu/ItemActionIcon/ItemActionIcon';
import { ItemButton } from '@/widgets/header/ui/menu/ItemButton/ItemButton';
import { ItemMenuTrigger } from '@/widgets/header/ui/menu/ItemMenuTrigger/ItemMenuTrigger';

type AppHeaderStoryArgs = {
  config?: Partial<HeaderConfig>;
  className?: string;
};

function renderAppHeader(partial: AppHeaderStoryArgs = {}) {
  const { menu, config } = resolveStorybookHeaderProps();

  return (
    <AppHeader
      menu={menu}
      config={{ ...config, ...partial.config }}
      className={partial.className}
    />
  );
}

const meta = {
  title: 'Widgets/Header/AppHeader',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      component: AppHeader,
      description: {
        component:
          'Schema-driven header shell and isolated menu controls (blocks, triggers, dropdowns). Toolbar **Mock on/off** applies to full-header stories; menu-control demos always use the fixture catalog.',
      },
    },
  },
  render: (args) => renderAppHeader(args),
  args: {},
} satisfies Meta<AppHeaderStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ContainerFluid: Story = {
  args: {
    config: { layout: 'container-fluid' },
  },
};

export const CustomType: Story = {
  args: {
    config: { type: 'custom' },
  },
};

export const MenuControlsActionIcons: Story = {
  args: {},
  parameters: { layout: 'padded' },
  render: () => {
    const { walletItem, notificationItem } = getHeaderMenuControlItems();

    return (
      <HeaderMenuControlsShell>
        <Group gap="sm">
          {walletItem !== undefined ? <ItemActionIcon item={walletItem} /> : null}
          {notificationItem !== undefined ? (
            <ItemActionIcon
              item={{
                ...notificationItem,
                name: '',
                img: notificationItem.img ?? '/images/ui/default/header/default/notification.svg',
              }}
            />
          ) : null}
        </Group>
      </HeaderMenuControlsShell>
    );
  },
};

export const MenuControlsTextButtons: Story = {
  args: {},
  parameters: { layout: 'padded' },
  render: () => {
    const { profileItem } = getHeaderMenuControlItems();

    return (
      <HeaderMenuControlsShell>
        {profileItem !== undefined ? (
          <ItemButton item={{ ...profileItem, items: undefined, name: 'profile' }} />
        ) : null}
      </HeaderMenuControlsShell>
    );
  },
};

export const MenuControlsDropdownTrigger: Story = {
  args: {},
  parameters: { layout: 'padded' },
  render: () => {
    const { profileItem } = getHeaderMenuControlItems();

    return (
      <HeaderMenuControlsShell>
        {profileItem !== undefined ? (
          <ItemMenuTrigger item={profileItem} rightSection={<Chevron />} />
        ) : null}
      </HeaderMenuControlsShell>
    );
  },
};

export const MenuControlsDropdownMenu: Story = {
  args: {},
  parameters: { layout: 'padded' },
  render: () => {
    const { profileItem } = getHeaderMenuControlItems();

    return (
      <HeaderMenuControlsShell>
        {profileItem !== undefined ? <Dropdown item={profileItem} /> : null}
      </HeaderMenuControlsShell>
    );
  },
};

export const MenuControlsSpecialBlocks: Story = {
  args: {},
  parameters: { layout: 'padded' },
  render: () => {
    const { searchItem, walletItem } = getHeaderMenuControlItems();

    return (
      <HeaderMenuControlsShell>
        <Stack gap="md">
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Search
            </Text>
            {searchItem !== undefined ? <SearchBlock item={searchItem} /> : null}
          </Stack>
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Wallet
            </Text>
            {walletItem !== undefined ? <WalletBlock item={walletItem} /> : null}
          </Stack>
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Color scheme
            </Text>
            <ColorSchemeBlock item={{ key: 'color_scheme', url: '', name: '' }} />
          </Stack>
        </Stack>
      </HeaderMenuControlsShell>
    );
  },
};

export const MenuControlsToolbarRow: Story = {
  args: {},
  parameters: { layout: 'padded' },
  render: () => {
    const { profileItem, walletItem, searchItem, notificationItem } = getHeaderMenuControlItems();

    return (
      <HeaderMenuControlsShell>
        <Stack gap="sm">
          <Title order={5}>Toolbar row (isolated blocks)</Title>
          <Group gap="xs">
            {searchItem !== undefined ? <SearchBlock item={searchItem} /> : null}
            <ColorSchemeBlock item={{ key: 'color_scheme', url: '', name: '' }} />
            {walletItem !== undefined ? <WalletBlock item={walletItem} /> : null}
            {profileItem !== undefined ? <Dropdown item={profileItem} /> : null}
            {notificationItem !== undefined ? (
              <ItemActionIcon
                item={{
                  ...notificationItem,
                  name: '',
                  img: notificationItem.img ?? '/images/ui/default/header/default/notification.svg',
                }}
              />
            ) : null}
          </Group>
        </Stack>
      </HeaderMenuControlsShell>
    );
  },
};
