import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group, Stack, Text } from '@mantine/core';

import {
  getHeaderMenuControlItems,
  HeaderMenuControlsShell,
} from '@/storybook/helpers/headerMenuControls';
import { ColorSchemeBlock } from '@/widgets/header/ui/blocks/ColorSchemeBlock/ColorSchemeBlock';
import { SearchBlock } from '@/widgets/header/ui/blocks/SearchBlock/SearchBlock';
import { WalletBlock } from '@/widgets/header/ui/blocks/WalletBlock/WalletBlock';

const meta = {
  title: 'Widgets/Header/Special Blocks',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Registry blocks with dedicated UI (`search`, `wallet`, `color_scheme`, …). No menu `type` / name+img rules.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blocks: Story = {
  render: () => {
    const { searchItem, walletItem } = getHeaderMenuControlItems();

    return (
      <HeaderMenuControlsShell>
        <Group gap="lg" align="flex-start">
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
        </Group>
      </HeaderMenuControlsShell>
    );
  },
};
