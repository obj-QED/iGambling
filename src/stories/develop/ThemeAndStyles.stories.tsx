import type { Meta, StoryObj } from '@storybook/react-vite';

import { ActionIcon, Button, Group, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { CmfIcon } from '@/shared/ui/CmfIcon';
import { STORYBOOK_DEMO_ICON } from '@/storybook/lib';

import { DEVELOP_CMF_ORDER, DEVELOP_VISUAL_TEST_STEPS } from './content';
import {
  DevelopBulletList,
  DevelopCode,
  DevelopDocPage,
  DevelopKvTable,
} from './ui/DevelopDocPage';

const meta = {
  title: 'Develop/Theme and Styles',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'How to test brand / CMF visuals in Storybook + where tokens live on disk. Matches assets/theme today.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <DevelopDocPage
      title="Theme & styles"
      subtitle="Mantine is the render engine. Tokens + CMF cascade live in SCSS. Use the toolbar Color scheme to verify light/dark — preview below reacts live."
      badges={['tokens SoT', 'CMF cascade', 'toolbar lab']}
      sections={[
        {
          id: 'lab',
          title: 'Live preview (use toolbar)',
          body: (
            <>
              <Text size="sm" c="var(--color-text-muted)" mb="md">
                Switch <strong>Color scheme</strong> (and optionally Primary shade). Background and
                brand paints should update. Icons use <code>publicAssetUrl</code> so they work with
                Storybook <code>base</code>.
              </Text>
              <Group gap="md" mb="lg" wrap="wrap">
                <Button variant="filled">filled</Button>
                <Button variant="light">light</Button>
                <Button variant="outline">outline</Button>
                <ActionIcon variant="filled" aria-label="plus">
                  <IconPlus size={16} stroke={2} />
                </ActionIcon>
                <ActionIcon variant="default" size="lg" aria-label="cmf">
                  <CmfIcon src={STORYBOOK_DEMO_ICON} alt="demo" shape="square" radius="sm" />
                </ActionIcon>
              </Group>
              <DevelopCode>{DEVELOP_VISUAL_TEST_STEPS}</DevelopCode>
            </>
          ),
        },
        {
          id: 'sot',
          title: 'Source of truth (edit here)',
          body: (
            <DevelopKvTable
              rows={[
                ['tokens/theme.scss', 'Global brand light/dark, spacing, tooltip paints'],
                ['tokens/widgets/header|sidebar/', 'Widget-scoped CMF tokens'],
                ['mantine/vars/', 'Mantine vars() resolvers'],
                ['mantine/styles/_cmf-control-cascade.scss', 'Cascade engine — do not paint here'],
                ['mantine/cmf/CASCADE.md', 'Naming guide'],
              ]}
              columns={['Path under assets/theme/', 'Role']}
            />
          ),
        },
        {
          id: 'layers',
          title: 'CSS cascade layers',
          body: (
            <>
              <Text size="sm" mb="xs">
                Declared in <code>src/assets/styles/layer-order.css</code> (weakest → strongest):
              </Text>
              <DevelopCode>{`reset → base → env → mantine → mantine-rebase → components → page → widget → theme

Inside widgets:
  widget.base → widget.element → widget.component → widget.layout → widget.variant`}</DevelopCode>
            </>
          ),
        },
        {
          id: 'cmf',
          title: 'CMF cascade',
          body: (
            <>
              <DevelopCode>{DEVELOP_CMF_ORDER}</DevelopCode>
              <Text size="sm" mt="sm" c="var(--color-text-muted)">
                Controls <code>color</code> on Element stories can look “stuck”: cascade often pins{' '}
                <code>--mantine-color-brand-*</code>. Prefer Color scheme + token edits for brand
                QA.
              </Text>
            </>
          ),
        },
        {
          id: 'assets',
          title: 'Public media in Storybook',
          body: (
            <DevelopBulletList
              items={[
                'Storybook Vite base is `/iGambling/` — bare `/uploads/...` 404s and CmfIcon hides on error.',
                "Always use `publicAssetUrl('uploads/…')` from `@/shared/lib/publicAssetUrl`.",
                'Fixtures: `@/storybook/lib` exports STORYBOOK_DEMO_ICON / TABLER_* helpers.',
              ]}
            />
          ),
        },
      ]}
    />
  ),
};
