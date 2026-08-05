import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '@mantine/core';

import {
  DEVELOP_AI_CHECKLIST,
  DEVELOP_FORBIDDEN,
  DEVELOP_KEY_PATHS,
  DEVELOP_STACK_ROWS,
} from './content';
import {
  DevelopBulletList,
  DevelopCode,
  DevelopDocPage,
  DevelopExternalLink,
  DevelopKvTable,
} from './ui/DevelopDocPage';

const meta = {
  title: 'Develop/AI Review Brief',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Public brief for external AI agents: how to read this codebase, what to verify, and where truth lives. English on purpose for cross-site review.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <DevelopDocPage
      title="AI review brief"
      subtitle="Use this Storybook Develop section as the entry point for architecture analytics. Prefer contracts and registries over ad-hoc JSX. Do not invent Next.js / RTK Query / colocated tests — they are not this stack."
      badges={['Public AI review', 'English', 'Schema-driven SPA']}
      sections={[
        {
          id: 'mission',
          title: 'What this project is',
          body: (
            <>
              <Text size="sm" mb="sm" c="var(--color-text)">
                Casino frontend SPA on a PHP API. Shell widgets (header, sidebar, banner, footer)
                are schema-driven: settings + API menu → resolved schema → registries → UI.
                Long-term goal: OSS-scale maintainability without architecture rewrites.
              </Text>
              <DevelopKvTable rows={DEVELOP_STACK_ROWS} columns={['Area', 'Choice']} />
            </>
          ),
        },
        {
          id: 'how-to-review',
          title: 'How external agents should review',
          body: (
            <DevelopBulletList
              items={[
                'Start here (Develop/*), then Widgets stories for live behavior, then source under src/widgets and src/shared/schema.',
                'Judge against FSD import direction, public.ts boundaries, and registry-over-switch rules.',
                'Flag violations from the Forbidden list — not stylistic preferences.',
                'Cite concrete paths (e.g. src/widgets/sidebar/ui/type/default/Strategy.tsx).',
                <>
                  Published Storybook:{' '}
                  <DevelopExternalLink href="https://obj-qed.github.io/iGambling/">
                    https://obj-qed.github.io/iGambling/
                  </DevelopExternalLink>
                </>,
              ]}
            />
          ),
        },
        {
          id: 'checklist',
          title: 'Review checklist',
          body: <DevelopBulletList items={DEVELOP_AI_CHECKLIST} />,
        },
        {
          id: 'forbidden',
          title: 'Hard forbidden patterns',
          body: <DevelopBulletList items={DEVELOP_FORBIDDEN} />,
        },
        {
          id: 'paths',
          title: 'Source of truth paths',
          body: <DevelopKvTable rows={DEVELOP_KEY_PATHS} columns={['Path', 'Role']} />,
        },
        {
          id: 'output',
          title: 'Expected review output format',
          body: (
            <DevelopCode>{`## Verdict
[pass | pass with risks | fail]

## Architecture findings
- [severity] path — issue — suggested fix

## Data / state findings
- …

## Theme / a11y / perf notes
- …

## Open questions
- …`}</DevelopCode>
          ),
        },
      ]}
    />
  ),
};
