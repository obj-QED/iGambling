import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group, Stack, Text, Title } from '@mantine/core';

import { createHeaderMenuFixture, findHeaderMenuItem } from '@/storybook/data';
import { ColorSchemeBlock } from '@/widgets/header/ui/blocks/ColorSchemeBlock/ColorSchemeBlock';
import { SearchBlock } from '@/widgets/header/ui/blocks/SearchBlock/SearchBlock';
import { WalletBlock } from '@/widgets/header/ui/blocks/WalletBlock/WalletBlock';
import { Chevron } from '@/widgets/header/ui/menu/Chevron/Chevron';
import { Dropdown } from '@/widgets/header/ui/menu/Dropdown/Dropdown';
import { ItemActionIcon } from '@/widgets/header/ui/menu/ItemActionIcon/ItemActionIcon';
import { ItemButton } from '@/widgets/header/ui/menu/ItemButton/ItemButton';
import { ItemMenuTrigger } from '@/widgets/header/ui/menu/ItemMenuTrigger/ItemMenuTrigger';

import '@/widgets/header/registry/registerBlocks';

const menu = createHeaderMenuFixture();
const profileItem = findHeaderMenuItem(menu, 'profile');
const walletItem = findHeaderMenuItem(menu, 'wallet');
const searchItem = findHeaderMenuItem(menu, 'search');
const notificationItem = findHeaderMenuItem(menu, 'notification');

const meta = {
  title: 'Widgets/Header/Menu Controls',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActionIcons: Story = {
  render: () => (
    <Group gap="sm">
      {walletItem !== undefined ? <ItemActionIcon item={walletItem} /> : <></>}
      {notificationItem !== undefined ? (
        <ItemActionIcon
          item={{
            ...notificationItem,
            name: '',
            img: notificationItem.img ?? '/images/ui/default/header/default/notification.svg',
          }}
        />
      ) : (
        <></>
      )}
    </Group>
  ),
};

export const TextButtons: Story = {
  render: () =>
    profileItem !== undefined ? (
      <ItemButton item={{ ...profileItem, items: undefined, name: 'profile' }} />
    ) : (
      <></>
    ),
};

export const DropdownTrigger: Story = {
  render: () =>
    profileItem !== undefined ? (
      <ItemMenuTrigger item={profileItem} rightSection={<Chevron />} />
    ) : (
      <></>
    ),
};

export const DropdownMenu: Story = {
  render: () => (profileItem !== undefined ? <Dropdown item={profileItem} /> : <></>),
};

export const SpecialBlocks: Story = {
  render: () => (
    <Stack gap="md">
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          Search
        </Text>
        {searchItem !== undefined ? <SearchBlock item={searchItem} /> : <></>}
      </Stack>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          Wallet
        </Text>
        {walletItem !== undefined ? <WalletBlock item={walletItem} /> : <></>}
      </Stack>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          Color scheme
        </Text>
        <ColorSchemeBlock item={{ key: 'color_scheme', url: '', name: '' }} />
      </Stack>
    </Stack>
  ),
};

export const ControlRow: Story = {
  render: () => (
    <Stack gap="sm">
      <Title order={5}>Toolbar row (isolated blocks)</Title>
      <Group gap="xs">
        {searchItem !== undefined ? <SearchBlock item={searchItem} /> : <></>}
        <ColorSchemeBlock item={{ key: 'color_scheme', url: '', name: '' }} />
        {walletItem !== undefined ? <WalletBlock item={walletItem} /> : <></>}
        {profileItem !== undefined ? <Dropdown item={profileItem} /> : <></>}
        {notificationItem !== undefined ? (
          <ItemActionIcon
            item={{
              ...notificationItem,
              name: '',
              img: notificationItem.img ?? '/images/ui/default/header/default/notification.svg',
            }}
          />
        ) : (
          <></>
        )}
      </Group>
    </Stack>
  ),
};
