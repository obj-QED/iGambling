import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group, Stack, Text } from '@mantine/core';

import { getHeaderMenuItemFixture } from '@/storybook/fixtures/headerMenuItems';
import { cmfComponentIconCascadeStyle } from '@/storybook/helpers/cmfScopeOverrides';
import { elementDocsPreviewParameters } from '@/storybook/helpers/elementStoryParameters';
import { HeaderMenuControlsShell } from '@/storybook/helpers/headerMenuControls';
import { Dropdown } from '@/widgets/header/ui/items/Dropdown/Dropdown';
import { ItemActionIcon } from '@/widgets/header/ui/items/ItemActionIcon/ItemActionIcon';
import { ItemButton } from '@/widgets/header/ui/items/ItemButton/ItemButton';

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
          'Default menu item renderers (`DefaultItemBlock`). Icon size via CMF cascade on `[data-widget=header]` / `--cmf-button-header-icon-*` / `--cmf-action-icon-header-icon-*`. Fixtures from `public/uploads`.',
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
