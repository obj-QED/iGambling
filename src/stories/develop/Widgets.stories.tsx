import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '@mantine/core';

import { DEVELOP_HEADER_PIPELINE, DEVELOP_SIDEBAR_PIPELINE } from './content';
import { DevelopBulletList, DevelopCode, DevelopDocPage } from './ui/DevelopDocPage';

const meta = {
  title: 'Develop/Widgets',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component: 'Header / Sidebar / Banner / Footer pipelines and ownership rules.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <DevelopDocPage
      title="Widgets"
      subtitle="Shell widgets compose registries. Data is fetched in app/layouts; widgets stay dumb."
      badges={['header', 'sidebar', 'banner', 'footer']}
      sections={[
        {
          id: 'contract',
          title: 'Widget contract',
          body: (
            <DevelopBulletList
              items={[
                'Input: menu/content + resolved schema/config props only',
                'Export surface: public.ts',
                'config/ — resolve* (no React)',
                'registry/ — sync maps only (no lazy in blockRegistry)',
                'typePacks/ — Strategy owns layout tree',
                'ui/ — props in, JSX out; types in types/',
                'See also live stories under Widgets/Header and Widgets/Sidebar',
              ]}
            />
          ),
        },
        {
          id: 'header',
          title: 'Header pipeline',
          body: (
            <>
              <DevelopCode>{DEVELOP_HEADER_PIPELINE}</DevelopCode>
              <Text size="sm" mt="sm" c="var(--color-text-muted)">
                Special blocks: search, logo, wallet, notification, color_scheme, bonus_box.
                Migration: shared schema + overlays shipped; plugins/runtime seeded; full engine
                singleton deferred.
              </Text>
            </>
          ),
        },
        {
          id: 'sidebar',
          title: 'Sidebar pipeline',
          body: (
            <>
              <DevelopCode>{DEVELOP_SIDEBAR_PIPELINE}</DevelopCode>
              <Text size="sm" mt="sm" c="var(--color-text-muted)">
                Account lives in aside.customBlocks (settings), not mock header section. Chrome
                components accept children so Strategy fully owns the tree.
              </Text>
            </>
          ),
        },
        {
          id: 'banner-footer',
          title: 'Banner & footer',
          body: (
            <DevelopBulletList
              items={[
                'Same schema contract: resolve*Schema in useAppLayout',
                'AppBanner / AppFooter receive content + schema props',
                'No getSettings() inside widget UI',
              ]}
            />
          ),
        },
        {
          id: 'module-shape',
          title: 'Typical module shape',
          body: (
            <DevelopCode>{`widgets/<name>/
├── public.ts
├── config/          defaults + resolve*Schema
├── registry/        sync layouts / blocks
├── typePacks/       Strategy + pack defaults
├── ui/              Root, Shell, Section, blocks, items
├── lib/             pure helpers
├── types/
└── styles/`}</DevelopCode>
          ),
        },
      ]}
    />
  ),
};
