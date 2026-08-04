import type { Meta, StoryObj } from '@storybook/react-vite';

import { DevelopBulletList, DevelopDocPage, DevelopKvTable } from './ui/DevelopDocPage';

const meta = {
  title: 'Develop/State and API',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component: 'TanStack Query vs Redux boundaries, bootstrap order, security notes.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <DevelopDocPage
      title="State & API"
      subtitle="Server cache stays in TanStack Query. Redux is intentionally tiny. Tokens are not a frontend storage problem."
      badges={['TanStack Query', 'Redux Toolkit', 'httpOnly']}
      sections={[
        {
          id: 'ownership',
          title: 'State ownership',
          body: (
            <DevelopKvTable
              rows={[
                ['Lists, init, pages, translations', 'TanStack Query (src/api) — keys + stale/gc'],
                ['Auth, session, feature flags', 'Redux Toolkit (src/store)'],
                ['Lobby session token', 'In-memory api/lobby — not Redux / localStorage'],
                ['Modal / hover / responsive UI', 'Local React state or schema — never Redux'],
              ]}
              columns={['Concern', 'Where']}
            />
          ),
        },
        {
          id: 'query',
          title: 'Query rules',
          body: (
            <DevelopBulletList
              items={[
                "Query keys: ['domain', 'action', params]",
                'Always define staleTime and gcTime',
                'No useQuery inside ui/ or widgets presentation',
                'Bootstrap order: translation → init',
                'Dedupe + prefetch; do not block root.render forever',
              ]}
            />
          ),
        },
        {
          id: 'security',
          title: 'Security (frontend)',
          body: (
            <DevelopBulletList
              items={[
                'Auth tokens: httpOnly cookies only (backend)',
                'Never put secrets in VITE_* (inlined into browser bundle)',
                'Do not log payment / PII payloads',
                'Frontend caching is not security — backend rate limit / validation required',
              ]}
            />
          ),
        },
        {
          id: 'layout-data',
          title: 'Layout data flow',
          body: (
            <DevelopBulletList
              items={[
                'app/layouts/useAppLayout — resolve menus + schemas',
                'AppLayout passes props into AppHeader / AppSidebar / AppBanner / AppFooter',
                'Widgets never fetch their own menus',
              ]}
            />
          ),
        },
      ]}
    />
  ),
};
