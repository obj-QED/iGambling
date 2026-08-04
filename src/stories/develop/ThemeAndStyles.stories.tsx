import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '@mantine/core';

import { DEVELOP_CMF_ORDER } from './content';
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
        component: 'Token SoT, CSS @layer order, CMF cascade for Button / ActionIcon.',
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
      subtitle="Mantine is the render engine only. Design tokens and cascade live in SCSS / CSS variables. Edit tokens, not the Sass engine."
      badges={['CSS Modules', '@layer', 'CMF cascade']}
      sections={[
        {
          id: 'sot',
          title: 'Source of truth',
          body: (
            <>
              <DevelopCode>{`src/assets/theme/tokens/   ← CSS variables (edit here)
        ↓
mantineTheme.ts            ← thin Mantine theme bridge
        ↓
elements + widgets`}</DevelopCode>
              <DevelopKvTable
                rows={[
                  ['tokens/theme.scss', 'Global brand, spacing, tooltip, paints'],
                  ['tokens/widgets/header|sidebar/', 'Widget-scoped CMF tokens'],
                  ['mantine/vars/', 'Mantine vars() resolvers'],
                  ['mantine/styles/', 'Control cascade + active states'],
                  ['mantine/cmf/', 'Cascade naming helpers / docs'],
                ]}
                columns={['Path', 'Role']}
              />
            </>
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
              <Text size="sm" mt="sm" c="dimmed">
                Live palette: Theme/Palette. Full docs: src/assets/theme/README.md and
                mantine/cmf/CASCADE.md.
              </Text>
            </>
          ),
        },
        {
          id: 'scss-rules',
          title: 'SCSS rules',
          body: (
            <DevelopBulletList
              items={[
                'CSS Modules only for components (.module.scss)',
                'BEM-ish .root; avoid deep nesting',
                'No !important; no layout logic in paint tokens',
                'Maps + CSS variables for variants — not if (variant) in SCSS component files',
              ]}
            />
          ),
        },
      ]}
    />
  ),
};
