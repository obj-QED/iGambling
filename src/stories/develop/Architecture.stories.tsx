import type { Meta, StoryObj } from '@storybook/react-vite';

import { DEVELOP_FORBIDDEN, DEVELOP_PLATFORM_PIPELINE, DEVELOP_SEPARATION_ROWS } from './content';
import {
  DevelopBulletList,
  DevelopCode,
  DevelopDocPage,
  DevelopKvTable,
} from './ui/DevelopDocPage';

const meta = {
  title: 'Develop/Architecture',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Schema-driven platform pipeline, theme vs settings vs API separation, forbidden patterns.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <DevelopDocPage
      title="Architecture"
      subtitle="Untrusted init/settings → DTO → domain → schema → UI. Registries over conditionals. Theme ≠ settings ≠ API."
      badges={['Schema-driven', 'Registries', 'No isMobile trees']}
      sections={[
        {
          id: 'pipeline',
          title: 'Platform pipeline',
          body: <DevelopCode>{DEVELOP_PLATFORM_PIPELINE}</DevelopCode>,
        },
        {
          id: 'separation',
          title: 'Separation of concerns',
          body: <DevelopKvTable rows={DEVELOP_SEPARATION_ROWS} columns={['Source', 'Owns']} />,
        },
        {
          id: 'schema',
          title: 'Schema core',
          body: (
            <DevelopBulletList
              items={[
                'src/shared/schema — resolveWidgetSchema, mergeSchemaLayers, capabilities helpers',
                'Inheritance order: defaults → global → brand → page → props',
                'Wrappers: shared/ui/overlay WRAPPER_REGISTRY (lazy by mode)',
                'Each widget: resolveHeaderSchema / resolveSidebarSchema / resolveBannerSchema / resolveFooterSchema',
                'Blocks must not call getSettings() — only resolved schema via props/context',
              ]}
            />
          ),
        },
        {
          id: 'registries',
          title: 'Registries over switch',
          body: (
            <DevelopCode>{`item.key     → BLOCK_REGISTRY[key]     → Block component
config.type  → TYPE_PACK / Strategy
wrapper mode → WRAPPER_REGISTRY[mode]  → lazy overlay

Forbidden in JSX:
  if (isMobile) …
  switch (variant) { … }`}</DevelopCode>
          ),
        },
        {
          id: 'forbidden',
          title: 'Forbidden',
          body: <DevelopBulletList items={DEVELOP_FORBIDDEN} />,
        },
      ]}
    />
  ),
};
