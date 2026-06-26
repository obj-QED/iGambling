import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group, Stack, Text } from '@mantine/core';

import {
  getHeaderMenuControlItems,
  HeaderMenuControlsShell,
} from '@/storybook/helpers/headerMenuControls';
import { Chevron } from '@/widgets/header/ui/menu/Chevron/Chevron';
import { Dropdown } from '@/widgets/header/ui/menu/Dropdown/Dropdown';
import { ItemActionIcon } from '@/widgets/header/ui/menu/ItemActionIcon/ItemActionIcon';
import { ItemButton } from '@/widgets/header/ui/menu/ItemButton/ItemButton';
import { ItemMenuTrigger } from '@/widgets/header/ui/menu/ItemMenuTrigger/ItemMenuTrigger';

const meta = {
  title: 'Widgets/Header/Menu Items',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Default menu item renderers (`DefaultItemBlock` pipeline). Uses fixture catalog — independent of header Mock toolbar.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primitives: Story = {
  render: () => {
    const { profileItem, walletItem, notificationItem } = getHeaderMenuControlItems();

    return (
      <HeaderMenuControlsShell>
        <Stack gap="lg">
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Icon only
            </Text>
            <Group gap="sm">
              {walletItem !== undefined ? <ItemActionIcon item={walletItem} /> : null}
              {notificationItem !== undefined ? (
                <ItemActionIcon
                  item={{
                    ...notificationItem,
                    name: '',
                    img:
                      notificationItem.img ?? '/images/ui/default/header/default/notification.svg',
                  }}
                />
              ) : null}
            </Group>
          </Stack>

          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Text button
            </Text>
            {profileItem !== undefined ? (
              <ItemButton item={{ ...profileItem, items: undefined, name: 'Profile' }} />
            ) : null}
          </Stack>

          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Dropdown
            </Text>
            <Group gap="sm">
              {profileItem !== undefined ? (
                <ItemMenuTrigger item={profileItem} rightSection={<Chevron />} />
              ) : null}
              {profileItem !== undefined ? <Dropdown item={profileItem} /> : null}
            </Group>
          </Stack>
        </Stack>
      </HeaderMenuControlsShell>
    );
  },
};
