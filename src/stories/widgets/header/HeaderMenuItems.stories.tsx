import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group, Stack, Text } from '@mantine/core';

import { getHeaderMenuItemFixture } from '@/storybook/fixtures/headerMenuItems';
import { elementDocsPreviewParameters } from '@/storybook/helpers/elementStoryParameters';
import { HeaderMenuControlsShell } from '@/storybook/helpers/headerMenuControls';
import { Dropdown } from '@/widgets/header/ui/menu/Dropdown/Dropdown';
import { ItemActionIcon } from '@/widgets/header/ui/menu/ItemActionIcon/ItemActionIcon';
import { ItemButton } from '@/widgets/header/ui/menu/ItemButton/ItemButton';

const meta = {
  title: 'Widgets/Header/Menu Items',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    ...elementDocsPreviewParameters,
    docs: {
      ...elementDocsPreviewParameters.docs,
      description: {
        component:
          'Default menu item renderers (`DefaultItemBlock`). Stable fixtures from `public/uploads` — not tied to header Mock toolbar.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <HeaderMenuControlsShell>
      <Stack gap="xl" align="flex-start">
        <Stack gap="xs" align="flex-start">
          <Text size="sm" fw={600}>
            Icon only · type link · transparent
          </Text>
          <Group gap="sm">
            <ItemActionIcon item={getHeaderMenuItemFixture('iconOnlyLink')} />
          </Group>
        </Stack>

        <Stack gap="xs" align="flex-start">
          <Text size="sm" fw={600}>
            Text only · type button · default
          </Text>
          <ItemButton item={getHeaderMenuItemFixture('textButton')} />
        </Stack>

        <Stack gap="xs" align="flex-start">
          <Text size="sm" fw={600}>
            Icon + name · type link
          </Text>
          <ItemButton item={getHeaderMenuItemFixture('iconAndText')} />
        </Stack>

        <Stack gap="xs" align="flex-start">
          <Text size="sm" fw={600}>
            Dropdown · icon trigger + menu
          </Text>
          <Dropdown item={getHeaderMenuItemFixture('dropdownProfile')} />
        </Stack>

        <Stack gap="xs" align="flex-start">
          <Text size="sm" fw={600}>
            Broken image · fallback glyph when name is set
          </Text>
          <ItemButton item={getHeaderMenuItemFixture('brokenImgWithName')} />
        </Stack>
      </Stack>
    </HeaderMenuControlsShell>
  ),
};
